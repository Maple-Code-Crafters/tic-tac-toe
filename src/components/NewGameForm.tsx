import { useEffect, useState } from 'react';

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

import { useStoredDefault } from '../hooks';
import type { Value } from '../models/Cell';
import { Game, Level, NumberOfPlayers } from '../models/Game';
import { Player } from '../models/Player';

type PlayersState = {
  player1Name: string;
  player1Value: Value;
  player2Name: string;
  player2Value: Value;
  numberOfPlayers: NumberOfPlayers;
  level: Level;
};

export const NewGameForm = ({ startGame }: { startGame: React.Dispatch<React.SetStateAction<Game | undefined>> }) => {
  const [present] = useIonAlert();
  const { restored, storedDefault } = useStoredDefault();
  const [state, setState] = useState<PlayersState>({
    player1Name: '',
    player1Value: 'O',
    player2Name: '',
    player2Value: 'X',
    numberOfPlayers: NumberOfPlayers.OnePlayer,
    level: Level.Easy,
  });

  useEffect(() => {
    if (restored) {
      const { player1Name, player2Name, numberOfPlayers, level } = storedDefault;
      setState((s) => ({ ...s, player1Name, player2Name, numberOfPlayers, level }));
    }
  }, [restored, storedDefault]);

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
              value={state.numberOfPlayers}
              onIonChange={(e) => {
                setState((s) => ({
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
          {state.numberOfPlayers === NumberOfPlayers.OnePlayer ? (
            <div>
              <IonItem lines="none">
                <IonSegment
                  scrollable={true}
                  value={state.level}
                  onIonChange={(e) => {
                    setState((s) => ({
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
              </IonItem>{' '}
            </div>
          ) : null}
          {/* Select the player 1 symbol */}
          <IonItem lines="none">
            <IonSegment
              slot="end"
              scrollable={true}
              value={state.player1Value}
              onIonChange={(e) => {
                setState((s) => ({
                  ...s,
                  player1Value: e.detail.value as Value,
                  player2Value: (e.detail.value as Value) === 'O' ? 'X' : 'O',
                }));
              }}
            >
              <IonSegmentButton value="O">
                <IonLabel className="o-x-value">{storedDefault.symbols.O}</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="X">
                <IonLabel className="o-x-value">{storedDefault.symbols.X}</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>
          {/* Select the player 1 name */}
          <IonItem>
            <IonInput
              placeholder="Enter player 1 name"
              value={state.player1Name}
              onIonInput={(e) => {
                setState((s) => ({
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
          {state.numberOfPlayers === NumberOfPlayers.TwoPlayers ? (
            <div>
              <IonItem lines="none">
                <IonSegment
                  slot="end"
                  scrollable={true}
                  value={state.player2Value}
                  onIonChange={(e) => {
                    setState((s) => ({
                      ...s,
                      player2Value: e.detail.value as Value,
                      player1Value: (e.detail.value as Value) === 'O' ? 'X' : 'O',
                    }));
                  }}
                >
                  <IonSegmentButton value="O">
                    <IonLabel className="o-x-value">{storedDefault.symbols.O}</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="X">
                    <IonLabel className="o-x-value">{storedDefault.symbols.X}</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Enter player 2 name"
                  value={state.player2Name}
                  onIonInput={(e) => {
                    setState((s) => ({
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
            if (!state.player1Name) {
              present({
                message: 'Please, enter player 1 name.',
                buttons: ['Ok'],
              });
            } else if (!state.player2Name) {
              present({
                message: 'Please, enter player 2 name.',
                buttons: ['Ok'],
              });
            } else {
              startGame(
                new Game(
                  new Player(state.player1Name, state.player1Value),
                  new Player(
                    state.numberOfPlayers === NumberOfPlayers.OnePlayer ? `CPU (${state.level})` : state.player2Name,
                    state.player2Value,
                  ),
                  state.numberOfPlayers,
                  state.level,
                ),
              );
            }
          }}
        >
          Start
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};
