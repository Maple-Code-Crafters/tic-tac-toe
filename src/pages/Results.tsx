import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { fileTrayOutline } from "ionicons/icons";
import { useState } from "react";
import { GameComponent } from "../components/GameComponent";
import { GameStorage, StoredGame } from "../helpers/storage.helper";
import "./Results.css";

const ResultsPage: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [storedGames, setStoredGames] = useState<StoredGame[]>();
  const [selectedStoredGame, setSelectedStoredGame] = useState<StoredGame>();

  const load = async () => {
    setStoredGames(undefined);
    setStoredGames(await GameStorage.getAllDescOrder());
  };

  useIonViewWillEnter(() => {
    load();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Results</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!selectedStoredGame ? (
          <IonListHeader>
            <IonLabel>Your Games</IonLabel>
            <IonButton
              onClick={() => {
                presentAlert({
                  header: "Confirm",
                  message:
                    "All your saved games will be deleted. Do you confirm?",
                  buttons: [
                    "Cancel",
                    {
                      text: "Delete",
                      handler: async () => {
                        await GameStorage.deteleAll();
                        load();
                      },
                    },
                  ],
                });
              }}
            >
              Delete All
            </IonButton>
          </IonListHeader>
        ) : (
          <IonListHeader>
            <IonLabel>
              <h3>
                {selectedStoredGame.game.player1.name} vs{" "}
                {selectedStoredGame.game.player2.name}
              </h3>
              <p>Date: {selectedStoredGame.date.toLocaleString()}</p>
            </IonLabel>
            <IonButton
              className="ion-no-padding"
              onClick={() => setSelectedStoredGame(undefined)}
            >
              Back
            </IonButton>
            <IonButton
              onClick={() => {
                presentAlert({
                  header: "Confirm",
                  message: "This saved game will be deleted. Do you confirm?",
                  buttons: [
                    "Cancel",
                    {
                      text: "Delete",
                      handler: async () => {
                        await GameStorage.deteleOne(
                          selectedStoredGame.date.toISOString()
                        );
                        setStoredGames(await GameStorage.getAllDescOrder());
                        setSelectedStoredGame(undefined);
                      },
                    },
                  ],
                });
              }}
            >
              Delete
            </IonButton>
          </IonListHeader>
        )}

        {storedGames && !selectedStoredGame && (
          <>
            {storedGames.length > 0 ? (
              <IonList>
                {storedGames.map((sg) => (
                  <IonItem
                    key={sg.date.toISOString()}
                    button
                    onClick={() => setSelectedStoredGame(sg)}
                  >
                    <IonAvatar className="o-x-value">
                      {sg.game.winValue}
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        {sg.game.player1.name} vs {sg.game.player2.name}
                      </h3>
                      <p>
                        {sg.game.winValue
                          ? `Winner: ${
                              sg.game.getPlayer(sg.game.winValue)?.name
                            }`
                          : "No winner"}
                      </p>
                      <p>Date: {sg.date.toLocaleString()}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            ) : (
              <div className="no-game">
                <IonIcon icon={fileTrayOutline} />
                <IonLabel>No game</IonLabel>
              </div>
            )}
          </>
        )}
        {selectedStoredGame && (
          <GameComponent
            game={selectedStoredGame.game}
            setGame={() => setSelectedStoredGame(undefined)}
            isStoredGame={true}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResultsPage;
