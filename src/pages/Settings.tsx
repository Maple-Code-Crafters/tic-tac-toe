import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import './Settings.css';

import { APP_NAME, VERSION } from '../constants';

const SettingsPage: React.FC = () => {
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
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
