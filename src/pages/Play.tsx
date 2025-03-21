import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { GameComponent } from '../components/GameComponent';
import { NewGameForm } from '../components/NewGameForm';
import { useAppSelector } from '../hooks';

const PlayPage: React.FC = () => {
  const gameConfig = useAppSelector((state) => state.game.config);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">New Game</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>{gameConfig ? <GameComponent key={gameConfig.id} /> : <NewGameForm />}</IonContent>
    </IonPage>
  );
};

export default PlayPage;
