import { useEffect, useState } from 'react';
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
import { Level, NumberOfPlayers, PlayerTurn } from '../models/Game';
import type { GameConfig } from '../slices/gameSlice';
import { setGameConfig, setGameSymbols } from '../slices/gameSlice';

export const NewGameForm = () => {
  const dispatch = useAppDispatch();
  const [present] = useIonAlert();
  const gameDefault = useAppSelector((state) => state.game.default);
  const [newGame, setNewGame] = useState<GameConfig>(() => {
    const isCpu = gameDefault.numberOfPlayers === NumberOfPlayers.OnePlayer;
    const initialGame: GameConfig = {
      id: uuidv4(),
      player1: {
        name: gameDefault.player1Name,
        value: 'X',
        isCpu: false,
      },
      player2: {
        name: isCpu ? `CPU (${gameDefault.level})` : gameDefault.player2Name,
        value: 'O',
        isCpu: isCpu,
      },
      numberOfPlayers: gameDefault.numberOfPlayers,
      level: gameDefault.level,
      initialPlayerTurn: PlayerTurn.Player1,
    };
    return initialGame;
  });

  useEffect(() => {
    setNewGame((prevState) => {
      const isCpu = gameDefault.numberOfPlayers === NumberOfPlayers.OnePlayer;
      const newState: GameConfig = {
        ...prevState,
        player1: {
          ...prevState.player1,
          name: gameDefault.player1Name,
        },
        player2: {
          ...prevState.player2,
          name: isCpu ? `CPU (${gameDefault.level})` : gameDefault.player2Name,
          isCpu,
        },
        numberOfPlayers: gameDefault.numberOfPlayers,
        level: gameDefault.level,
      };
      return newState;
    });
  }, [gameDefault.level, gameDefault.numberOfPlayers, gameDefault.player1Name, gameDefault.player2Name]);

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
                setNewGame((prevState) => {
                  const numberOfPlayers = e.detail.value as NumberOfPlayers;
                  const isCpu = numberOfPlayers === NumberOfPlayers.OnePlayer;
                  const newState: GameConfig = {
                    ...prevState,
                    numberOfPlayers,
                    player2: {
                      ...prevState.player2,
                      name: isCpu ? `CPU (${prevState.level})` : gameDefault.player2Name,
                      isCpu,
                    },
                  };
                  return newState;
                });
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
                    setNewGame((prevState) => {
                      const level = e.detail.value as Level;
                      const newState: GameConfig = {
                        ...prevState,
                        level,
                        player2: {
                          ...prevState.player2,
                          name: `CPU (${level})`,
                        },
                      };
                      return newState;
                    });
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
              value={newGame.player1.value}
              onIonChange={(e) => {
                setNewGame((prevState) => {
                  const value = e.detail.value as Value;
                  const newState: GameConfig = {
                    ...prevState,
                    player1: {
                      ...prevState.player1,
                      value,
                    },
                    player2: {
                      ...prevState.player2,
                      value: value === 'O' ? 'X' : 'O',
                    },
                  };
                  return newState;
                });
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
              value={newGame.player1.name}
              onIonInput={(e) => {
                setNewGame((prevState) => {
                  const newState: GameConfig = {
                    ...prevState,
                    player1: {
                      ...prevState.player1,
                      name: e.detail.value ?? '',
                    },
                  };
                  return newState;
                });
              }}
              autofocus={true}
              clearInput={true}
              enterkeyhint="enter"
              inputmode="text"
            ></IonInput>
          </IonItem>
          {/* Select the player 2 symbol */}
          <IonItem lines="none">
            <IonSegment
              slot="end"
              scrollable={true}
              value={newGame.player2.value}
              onIonChange={(e) => {
                setNewGame((prevState) => {
                  const value = e.detail.value as Value;
                  const newState: GameConfig = {
                    ...prevState,
                    player2: {
                      ...prevState.player2,
                      value,
                    },
                    player1: {
                      ...prevState.player1,
                      value: value === 'O' ? 'X' : 'O',
                    },
                  };
                  return newState;
                });
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
          {/* Select the player 2 name */}
          <IonItem>
            <IonInput
              placeholder="Enter player 2 name"
              value={newGame.player2.name}
              onIonInput={(e) => {
                setNewGame((prevState) => {
                  const newState: GameConfig = {
                    ...prevState,
                    player2: {
                      ...prevState.player2,
                      name: e.detail.value ?? '',
                    },
                  };
                  return newState;
                });
              }}
              clearInput={true}
              enterkeyhint="enter"
              inputmode="text"
            ></IonInput>
          </IonItem>
        </IonItemGroup>
        <IonButton
          className="ion-margin-top"
          expand="block"
          onClick={() => {
            if (!newGame.player1.name) {
              present({
                message: 'Please, enter player 1 name.',
                buttons: ['Ok'],
              });
            } else if (!newGame.player2.name) {
              present({
                message: 'Please, enter player 2 name.',
                buttons: ['Ok'],
              });
            } else {
              dispatch(setGameSymbols(gameDefault.symbols));
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
