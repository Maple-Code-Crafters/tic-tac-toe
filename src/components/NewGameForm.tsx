import { useState } from "react";

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
} from "@ionic/react";

import "./NewGameForm.css";

import type { Value } from "../models/Cell";
import { Game } from "../models/Game";
import { Player } from "../models/Player";

type PlayersState = {
  player1Name: string;
  player1Value: Value;
  player2Name: string;
  player2Value: Value;
};

export const NewGameForm = ({
  startGame,
}: {
  startGame: (game: Game) => void;
}) => {
  const [present] = useIonAlert();
  const [state, setState] = useState<PlayersState>({
    player1Name: "",
    player1Value: "O",
    player2Name: "",
    player2Value: "X",
  });

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Select Players</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItemGroup>
          <IonItem lines="none">
            <IonLabel position="stacked">Player 1</IonLabel>
            <IonSegment
              scrollable={true}
              value={state.player1Value}
              onIonChange={(e) => {
                setState((s) => ({
                  ...s,
                  player1Value: e.detail.value as Value,
                  player2Value: (e.detail.value as Value) === "O" ? "X" : "O",
                }));
              }}
            >
              <IonSegmentButton value="O">
                <IonLabel className="o-x-value">O</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="X">
                <IonLabel className="o-x-value">X</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Enter player 1 name"
              value={state.player1Name}
              onIonChange={(e) => {
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
          <IonItem lines="none">
            <IonLabel position="stacked">Player 2</IonLabel>
            <IonSegment
              scrollable={true}
              value={state.player2Value}
              onIonChange={(e) => {
                setState((s) => ({
                  ...s,
                  player2Value: e.detail.value as Value,
                  player1Value: (e.detail.value as Value) === "O" ? "X" : "O",
                }));
              }}
            >
              <IonSegmentButton value="O">
                <IonLabel className="o-x-value">O</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="X">
                <IonLabel className="o-x-value">X</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Enter player 2 name"
              value={state.player2Name}
              onIonChange={(e) => {
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
        </IonItemGroup>
        <IonButton
          className="ion-margin-top"
          expand="block"
          onClick={() => {
            if (!state.player1Name) {
              present({
                message: "Please, enter player 1 name.",
                buttons: ["Ok"],
              });
            } else if (!state.player2Name) {
              present({
                message: "Please, enter player 2 name.",
                buttons: ["Ok"],
              });
            } else {
              startGame(
                new Game(
                  new Player(state.player1Name, state.player1Value),
                  new Player(state.player2Name, state.player2Value)
                )
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
