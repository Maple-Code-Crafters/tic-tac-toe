import { useEffect, useMemo, useState } from 'react';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { GameComponent } from '../components/GameComponent';
import { NewGameForm } from '../components/NewGameForm';
import type { Symbols } from '../helpers/storage.helper';
import { useParamQuery, useStoredDefault } from '../hooks';
import type { Value } from '../models/Cell';
import { Game } from '../models/Game';
import { Player } from '../models/Player';

const PlayPage: React.FC = () => {
  const { storedDefault } = useStoredDefault();
  const params = useParamQuery();
  const player1Name = params.get('player1Name');
  const player1Value = params.get('player1Value');
  const player2Name = params.get('player2Name');
  const player2Value = params.get('player2Value');
  const X = params.get('X');
  const O = params.get('O');
  const [game, setGame] = useState<Game>();
  const symbols = useMemo<Symbols>(() => (X && O ? { X, O } : storedDefault.symbols), [X, O, storedDefault.symbols]);

  useEffect(() => {
    if (player1Name && player1Value && player2Name && player2Value) {
      setGame(new Game(new Player(player1Name, player1Value as Value), new Player(player2Name, player2Value as Value)));
    }
  }, [player1Name, player1Value, player2Name, player2Value]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">New Game</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {game ? (
          <GameComponent game={game} symbols={symbols} setGame={setGame} isStoredGame={false} />
        ) : (
          <NewGameForm startGame={setGame} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default PlayPage;
