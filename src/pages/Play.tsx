import { useEffect, useState } from 'react';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { GameComponent } from '../components/GameComponent';
import { NewGameForm } from '../components/NewGameForm';
import { useParamQuery } from '../hooks';
import type { Value } from '../models/Cell';
import { Game } from '../models/Game';
import { Player } from '../models/Player';

const PlayPage: React.FC = () => {
  const params = useParamQuery();
  const player1Name = params.get('player1Name');
  const player1Value = params.get('player1Value');
  const player2Name = params.get('player2Name');
  const player2Value = params.get('player2Value');
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    if (player1Name && player1Value && player2Name && player2Value) {
      setGame(new Game(new Player(player1Name, player1Value as Value), new Player(player2Name, player2Value as Value)));
    }
  }, [player1Name, player1Value, player2Name, player2Value]);

  return (
    <IonPage>
      {!game && (
        <IonHeader>
          <IonToolbar>
            <IonTitle>New Game</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}

      <IonContent>
        {!game && (
          <>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">New Game </IonTitle>
              </IonToolbar>
            </IonHeader>
            <NewGameForm startGame={setGame} />
          </>
        )}
        {game && <GameComponent game={game} setGame={setGame} isStoredGame={false} />}
      </IonContent>
    </IonPage>
  );
};

export default PlayPage;
