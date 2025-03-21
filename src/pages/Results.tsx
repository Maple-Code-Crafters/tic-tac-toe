import { useCallback, useEffect, useState } from 'react';
import { fileTrayOutline } from 'ionicons/icons';
import { useLocation } from 'react-router';

import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from '@ionic/react';

import './Results.css';

import { GameComponent } from '../components/GameComponent';
import type { PlayedGame } from '../helpers/storage.helper';
import { GameStorage } from '../helpers/storage.helper';
import { useAppDispatch } from '../hooks';
import { setGameSymbols } from '../slices/gameSlice';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const [presentAlert] = useIonAlert();
  const dispatch = useAppDispatch();
  const [playedGames, setPlayedGames] = useState<PlayedGame[]>();
  const [selectedPlayedGame, setSelectedPlayedGame] = useState<PlayedGame>();

  const load = useCallback(async () => {
    setSelectedPlayedGame(undefined);
    setPlayedGames(await GameStorage.getResults());
  }, []);

  useEffect(() => {
    load();
    // location is here to trigger loading/refreshing after navigation from another tab
  }, [load, location]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Results</IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            onClick={() => {
              presentAlert({
                header: 'Confirm',
                message: 'All your saved games will be deleted. Do you confirm?',
                buttons: [
                  'Cancel',
                  {
                    text: 'Delete',
                    handler: async () => {
                      await GameStorage.deteleAll();
                      load();
                    },
                  },
                ],
              });
            }}
          >
            Delete All
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {selectedPlayedGame ? (
          <>
            <IonListHeader>
              <IonLabel>
                <h3>
                  {selectedPlayedGame.game.player1.name} vs {selectedPlayedGame.game.player2.name}
                </h3>
                <p>Date: {selectedPlayedGame.date.toLocaleString()}</p>
              </IonLabel>
              <IonButton className="ion-no-padding" onClick={() => setSelectedPlayedGame(undefined)}>
                Back
              </IonButton>
              <IonButton
                onClick={() => {
                  presentAlert({
                    header: 'Confirm',
                    message: 'This saved game will be deleted. Do you confirm?',
                    buttons: [
                      'Cancel',
                      {
                        text: 'Delete',
                        handler: async () => {
                          await GameStorage.deteleOne(selectedPlayedGame);
                          load();
                        },
                      },
                    ],
                  });
                }}
              >
                Delete
              </IonButton>
            </IonListHeader>
            <GameComponent key={selectedPlayedGame.game.id} storedGame={selectedPlayedGame.game} />
          </>
        ) : playedGames && playedGames.length > 0 ? (
          <IonList>
            {playedGames.map((playedGame) => (
              <IonItem
                key={playedGame.game.id}
                button
                onClick={() => {
                  dispatch(setGameSymbols(playedGame.symbols));
                  setSelectedPlayedGame(playedGame);
                }}
              >
                <IonAvatar className="o-x-value">
                  {playedGame.game.winValue ? playedGame.symbols[playedGame.game.winValue] : ''}
                </IonAvatar>
                <IonLabel>
                  <h3>
                    {playedGame.game.player1.name} vs {playedGame.game.player2.name}
                  </h3>
                  <p>
                    {playedGame.game.winValue
                      ? `Winner: ${playedGame.game.getPlayer(playedGame.game.winValue)?.name}`
                      : 'No winner'}
                  </p>
                  <p>Date: {playedGame.date.toLocaleString()}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <div className="no-game">
            {!playedGames ? (
              <IonSpinner />
            ) : (
              <>
                <IonIcon icon={fileTrayOutline} />
                <IonLabel>No game</IonLabel>
              </>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResultsPage;
