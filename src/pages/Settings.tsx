import { useEffect, useState } from 'react';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';

import './Settings.css';

import { APP_NAME, VERSION } from '../constants';
import { useStoredPlayerNames } from '../hooks';

const SettingsPage: React.FC = () => {
  const [present] = useIonToast();
  const { storedPlayer1Name, savePlayer1Name, storedPlayer2Name, savePlayer2Name } = useStoredPlayerNames();
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1NameRestored, setPlayer1NameRestored] = useState(false);
  const [player2NameRestored, setPlayer2NameRestored] = useState(false);

  useEffect(() => {
    if (storedPlayer1Name && !player1NameRestored) {
      setPlayer1Name(storedPlayer1Name);
      setPlayer1NameRestored(true);
    }
  }, [player1NameRestored, storedPlayer1Name]);

  useEffect(() => {
    if (storedPlayer2Name && !player2NameRestored) {
      setPlayer2Name(storedPlayer2Name);
      setPlayer2NameRestored(true);
    }
  }, [player2NameRestored, storedPlayer2Name]);

  const showSavedToast = (player: 'Player 1' | 'Player 2') => {
    present({
      message: `${player} name saved!`,
      duration: 1500,
      position: 'top',
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard className="logo-card">
          <IonCardHeader className="ion-justify-content-center logo-card-header">
            <IonCardTitle className="ion-text-center">{APP_NAME}</IonCardTitle>
            <IonImg className="logo" src="assets/icons/logo.png" alt={`${APP_NAME} logo`}></IonImg>
          </IonCardHeader>
          <IonCardContent className="ion-text-center">version: {VERSION}</IonCardContent>
        </IonCard>

        <IonList>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Players names</IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonInput
                label="Player 1"
                placeholder="Add name"
                clearInput
                value={player1Name}
                onIonInput={(e) => setPlayer1Name((e.target.value as string) ?? '')}
              ></IonInput>
              <IonButton
                disabled={!player1Name || player1Name === storedPlayer1Name}
                onClick={() => {
                  savePlayer1Name(player1Name);
                  setPlayer1NameRestored(false);
                  showSavedToast('Player 1');
                }}
              >
                Save
              </IonButton>
            </IonItem>
            <IonItem lines="none">
              <IonInput
                label="Player 2"
                placeholder="Add name"
                clearInput
                value={player2Name}
                onIonInput={(e) => setPlayer2Name((e.target.value as string) ?? '')}
              ></IonInput>
              <IonButton
                disabled={!player2Name || player2Name === storedPlayer2Name}
                onClick={() => {
                  savePlayer2Name(player2Name);
                  setPlayer2NameRestored(false);
                  showSavedToast('Player 2');
                }}
              >
                Save
              </IonButton>
            </IonItem>
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Symbols</IonLabel>
            </IonItemDivider>

            <IonItem>
              <IonLabel>B1</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>B3</IonLabel>
            </IonItem>
          </IonItemGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
