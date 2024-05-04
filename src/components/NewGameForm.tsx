import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  useIonAlert,
} from '@ionic/react';

import './NewGameForm.css';

import { useAppDispatch, useAppSelector } from '../hooks';
import type { Value } from '../models/Cell';
import { Level, NumberOfPlayers } from '../models/Game';
import type { GameConfig } from '../slices/gameSlice';
import { setGameConfig } from '../slices/gameSlice';

export const NewGameForm = () => {
  const dispatch = useAppDispatch();
  const [present] = useIonAlert();
  const gameDefault = useAppSelector((state) => state.game.default!);
  const [newGame, setNewGame] = useState<GameConfig>({
    id: uuidv4(),
    player1Value: 'O',
    player2Value: 'X',
    turn: 'O',
    ...gameDefault,
  });

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Select Players</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItemGroup>
          {/* Select the number of players */}
          <IonItem lines="none">
            <IonSegment
              scrollable={true}
              value={newGame.numberOfPlayers}
              onIonChange={(e) => {
                setNewGame((s) => ({
                  ...s,
                  numberOfPlayers: e.detail.value as NumberOfPlayers,
                }));
              }}
            >
              <IonSegmentButton value={NumberOfPlayers.OnePlayer}>
                <IonLabel>One Player</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value={NumberOfPlayers.TwoPlayers}>
                <IonLabel>Two Players</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>
          {/* Select the level */}
          {newGame.numberOfPlayers === NumberOfPlayers.OnePlayer ? (
            <div>
              <IonItem lines="none">
                <IonSegment
                  scrollable={true}
                  value={newGame.level}
                  onIonChange={(e) => {
                    setNewGame((s) => ({
                      ...s,
                      level: e.detail.value as Level,
                    }));
                  }}
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
            </div>
          ) : null}
          {/* Select the player 1 symbol */}
          <IonItem lines="none">
            <IonSegment
              slot="end"
              scrollable={true}
              value={newGame.player1Value}
              onIonChange={(e) => {
                setNewGame((s) => ({
                  ...s,
                  player1Value: e.detail.value as Value,
                  player2Value: (e.detail.value as Value) === 'O' ? 'X' : 'O',
                }));
              }}
            >
              <IonSegmentButton value="O">
                <IonLabel className="o-x-value">{gameDefault.symbols.O}</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="X">
                <IonLabel className="o-x-value">{gameDefault.symbols.X}</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>
          {/* Select the player 1 name */}
          <IonItem>
            <IonInput
              placeholder="Enter player 1 name"
              value={newGame.player1Name}
              onIonInput={(e) => {
                setNewGame((s) => ({
                  ...s,
                  player1Name: e.detail.value!,
                }));
              }}
              autofocus={true}
              clearInput={true}
              enterkeyhint="enter"
              inputmode="text"
            ></IonInput>
          </IonItem>
          {newGame.numberOfPlayers === NumberOfPlayers.TwoPlayers ? (
            <div>
              <IonItem lines="none">
                <IonSegment
                  slot="end"
                  scrollable={true}
                  value={newGame.player2Value}
                  onIonChange={(e) => {
                    setNewGame((s) => ({
                      ...s,
                      player2Value: e.detail.value as Value,
                      player1Value: (e.detail.value as Value) === 'O' ? 'X' : 'O',
                    }));
                  }}
                >
                  <IonSegmentButton value="O">
                    <IonLabel className="o-x-value">{gameDefault.symbols.O}</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="X">
                    <IonLabel className="o-x-value">{gameDefault.symbols.X}</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Enter player 2 name"
                  value={newGame.player2Name}
                  onIonInput={(e) => {
                    setNewGame((s) => ({
                      ...s,
                      player2Name: e.detail.value!,
                    }));
                  }}
                  clearInput={true}
                  enterkeyhint="enter"
                  inputmode="text"
                ></IonInput>
              </IonItem>
            </div>
          ) : null}
        </IonItemGroup>
        <IonButton
          className="ion-margin-top"
          expand="block"
          onClick={() => {
            if (!newGame.player1Name) {
              present({
                message: 'Please, enter player 1 name.',
                buttons: ['Ok'],
              });
            } else if (!newGame.player2Name) {
              present({
                message: 'Please, enter player 2 name.',
                buttons: ['Ok'],
              });
            } else {
              dispatch(setGameConfig(newGame));
            }
          }}
        >
          Start
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};
