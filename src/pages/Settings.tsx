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
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';

import './Settings.css';

import { APP_NAME, VERSION } from '../constants';
import type { Default } from '../helpers/storage.helper';
import { useStoredDefault } from '../hooks';

interface InputChangeEventDetail {
  value?: string | undefined | null;
}

interface InputCustomEvent extends CustomEvent {
  detail: InputChangeEventDetail;
  target: HTMLIonInputElement;
}

const SettingsPage: React.FC = () => {
  const [present] = useIonToast();
  const { restored, setRestored, storedDefault, saveDefault } = useStoredDefault();
  const [newDefault, setNewDefault] = useState<Default>(storedDefault);

  useEffect(() => {
    if (restored) {
      setNewDefault(storedDefault);
    }
  }, [restored, storedDefault]);

  const onInput = (e: InputCustomEvent) => {
    setNewDefault((prev) => ({ ...prev, [e.target.name]: e.target.value as string }));
  };

  const showSavedToast = () => {
    present({
      message: 'New changes saved!',
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
                name="player1Name"
                label="Player 1"
                placeholder="Add a name"
                clearInput
                value={newDefault.player1Name}
                onIonInput={onInput}
              ></IonInput>
            </IonItem>
            <IonItem lines="none">
              <IonInput
                name="player2Name"
                label="Player 2"
                placeholder="Add a name"
                clearInput
                value={newDefault.player2Name}
                onIonInput={onInput}
              ></IonInput>
            </IonItem>
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Symbols</IonLabel>
            </IonItemDivider>

            <IonItem>
              <IonInput
                name="O"
                label="O"
                placeholder="Add a symbol"
                clearInput
                maxlength={1}
                value={newDefault.O}
                onIonInput={onInput}
              ></IonInput>
            </IonItem>
            <IonItem lines="none">
              <IonInput
                name="X"
                label="X"
                placeholder="Add a symbol"
                clearInput
                maxlength={1}
                value={newDefault.X}
                onIonInput={onInput}
              ></IonInput>
            </IonItem>
          </IonItemGroup>
        </IonList>
        <IonCard>
          <IonButton
            className="ion-margin"
            expand="block"
            disabled={
              !newDefault.player1Name ||
              !newDefault.player2Name ||
              !newDefault.O ||
              !newDefault.X ||
              (newDefault.player1Name === storedDefault.player1Name &&
                newDefault.player2Name === storedDefault.player2Name &&
                newDefault.O === storedDefault.O &&
                newDefault.X === storedDefault.X)
            }
            onClick={() => {
              saveDefault(newDefault);
              setRestored(false);
              showSavedToast();
            }}
          >
            Save
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
