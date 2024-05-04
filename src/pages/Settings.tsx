import { useState } from 'react';

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
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';

import './Settings.css';

import { APP_NAME, APP_VERSION } from '../constants';
import type { Default } from '../helpers/storage.helper';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Level, NumberOfPlayers } from '../models/Game';
import { saveDefaultAsync } from '../slices/gameSlice';

interface InputChangeEventDetail {
  value?: string | undefined | null;
}

interface InputCustomEvent extends CustomEvent {
  detail: InputChangeEventDetail;
  target: HTMLIonInputElement;
}

const SettingsPage: React.FC = () => {
  const [present] = useIonToast();
  const dispatch = useAppDispatch();
  const gameDefault = useAppSelector((state) => state.game.default);
  const [newDefault, setNewDefault] = useState<Default>(gameDefault);

  const onNameInput = (e: InputCustomEvent) => {
    setNewDefault((prev) => ({ ...prev, [e.target.name]: e.target.value as string }));
  };

  const onSymbolInput = (e: InputCustomEvent) => {
    const emojiRegex = /\p{Emoji_Presentation}/gu;
    let value = e.detail.value as string;
    const isEmoji = emojiRegex.test(value);
    if (!isEmoji) {
      value = value?.[0];
      e.target.value = value;
    }
    setNewDefault((prev) => ({ ...prev, symbols: { ...prev.symbols, [e.target.name]: value } }));
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
          <IonTitle size="large">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard className="logo-card">
          <IonCardHeader className="ion-justify-content-center logo-card-header">
            <IonCardTitle className="ion-text-center">{APP_NAME}</IonCardTitle>
            <IonImg className="logo" src="assets/icons/logo.png" alt={`${APP_NAME} logo`}></IonImg>
          </IonCardHeader>
          <IonCardContent className="ion-text-center">version: {APP_VERSION}</IonCardContent>
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
                onIonInput={onNameInput}
              ></IonInput>
            </IonItem>
            <IonItem lines="none">
              <IonInput
                name="player2Name"
                label="Player 2"
                placeholder="Add a name"
                clearInput
                value={newDefault.player2Name}
                onIonInput={onNameInput}
              ></IonInput>
            </IonItem>
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Symbols</IonLabel>
            </IonItemDivider>

            <IonItem>
              <IonInput
                className="emoji"
                name="O"
                label="O"
                placeholder="Add a symbol"
                clearInput
                maxlength={2}
                value={newDefault.symbols.O}
                onIonInput={onSymbolInput}
              ></IonInput>
            </IonItem>
            <IonItem lines="none">
              <IonInput
                className="emoji"
                name="X"
                label="X"
                placeholder="Add a symbol"
                clearInput
                maxlength={2}
                value={newDefault.symbols.X}
                onIonInput={onSymbolInput}
              ></IonInput>
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Number of Players</IonLabel>
            </IonItemDivider>
            <IonItem lines="none">
              <IonSegment
                scrollable={true}
                value={newDefault.numberOfPlayers}
                onIonChange={(e) =>
                  setNewDefault((prev) => ({ ...prev, numberOfPlayers: e.detail.value as NumberOfPlayers }))
                }
              >
                <IonSegmentButton value={NumberOfPlayers.OnePlayer}>
                  <IonLabel>One Player</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value={NumberOfPlayers.TwoPlayers}>
                  <IonLabel>Two Players</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Level</IonLabel>
            </IonItemDivider>
            <IonItem lines="none">
              <IonSegment
                scrollable={true}
                value={newDefault.level}
                onIonChange={(e) => setNewDefault((prev) => ({ ...prev, level: e.detail.value as Level }))}
              >
                <IonSegmentButton value={Level.Easy}>
                  <IonLabel>Easy</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value={Level.Medium}>
                  <IonLabel>Medium</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value={Level.Hard}>
                  <IonLabel>Hard</IonLabel>
                </IonSegmentButton>
              </IonSegment>
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
              !newDefault.symbols.O ||
              !newDefault.symbols.X ||
              (newDefault.numberOfPlayers === gameDefault.numberOfPlayers &&
                newDefault.level === gameDefault.level &&
                newDefault.player1Name === gameDefault.player1Name &&
                newDefault.player2Name === gameDefault.player2Name &&
                newDefault.symbols.O === gameDefault.symbols.O &&
                newDefault.symbols.X === gameDefault.symbols.X)
            }
            onClick={async () => {
              await dispatch(saveDefaultAsync(newDefault));
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
