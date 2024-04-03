import { useCallback, useState } from 'react';
import { fileTrayOutline } from 'ionicons/icons';

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
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter,
} from '@ionic/react';

import './Results.css';

import { GameComponent } from '../components/GameComponent';
import type { PlayedGame } from '../helpers/storage.helper';
import { GameStorage } from '../helpers/storage.helper';

const ResultsPage: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [playedGames, setPlayedGames] = useState<PlayedGame[]>();
  const [selectedPlayedGame, setSelectedPlayedGame] = useState<PlayedGame>();

  const load = useCallback(async () => {
    setSelectedPlayedGame(undefined);
    setPlayedGames(await GameStorage.getResults());
  }, []);

  useIonViewWillEnter(() => {
    load();
  }, [load]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Results</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!selectedPlayedGame ? (
          <IonListHeader>
            <IonLabel>Your Games</IonLabel>
            <IonButton
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
          </IonListHeader>
        ) : (
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
        )}

        {playedGames && !selectedPlayedGame && (
          <>
            {playedGames.length > 0 ? (
              <IonList>
                {playedGames.map((sg) => (
                  <IonItem key={sg.date.toISOString()} button onClick={() => setSelectedPlayedGame(sg)}>
                    <IonAvatar className="o-x-value">{sg.game.winValue ? sg.symbols[sg.game.winValue] : ''}</IonAvatar>
                    <IonLabel>
                      <h3>
                        {sg.game.player1.name} vs {sg.game.player2.name}
                      </h3>
                      <p>{sg.game.winValue ? `Winner: ${sg.game.getPlayer(sg.game.winValue)?.name}` : 'No winner'}</p>
                      <p>Date: {sg.date.toLocaleString()}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            ) : (
              <div className="no-game">
                <IonIcon icon={fileTrayOutline} />
                <IonLabel>No game</IonLabel>
              </div>
            )}
          </>
        )}
        {selectedPlayedGame && (
          <GameComponent
            game={selectedPlayedGame.game}
            symbols={selectedPlayedGame.symbols}
            setGame={() => setSelectedPlayedGame(undefined)}
            isStoredGame={true}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResultsPage;
