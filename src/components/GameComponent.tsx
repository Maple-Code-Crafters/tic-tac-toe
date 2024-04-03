import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
} from '@ionic/react';

import './GameComponent.css';

import type { Symbols } from '../helpers/storage.helper';
import { GameStorage } from '../helpers/storage.helper';
import type { Value } from '../models/Cell';
import type { Index } from '../models/Game';
import { Game } from '../models/Game';
import { Player } from '../models/Player';

export const GameComponent = ({
  game,
  symbols,
  setGame,
  isStoredGame,
}: {
  game: Game;
  symbols: Symbols;
  setGame: React.Dispatch<React.SetStateAction<Game | undefined>>;
  isStoredGame: boolean;
}) => {
  const history = useHistory();
  const height = (window.screen.availWidth * 0.86675) / 3;
  const [turn, setTurn] = useState<Value>(game.player1.value);
  const [saved, setSaved] = useState(isStoredGame);
  const hasWin = game.hasWin();
  const finished = game.finished();

  useEffect(() => {
    if ((hasWin || finished) && !saved) {
      GameStorage.saveGame({ date: new Date(), game, symbols });
      setSaved(true);
    }
  }, [finished, game, hasWin, saved, symbols]);

  const handleCellClick = (index: Index) => {
    game.getCell(index).value = turn;
    setTurn(turn === 'O' ? 'X' : 'O');
  };

  return (
    <>
      <IonCard>
        <IonCardHeader>
          {(!finished || (finished && hasWin)) && (
            <>
              <IonCardSubtitle>{hasWin ? 'Winner' : 'Player turn'}</IonCardSubtitle>
              <IonCardTitle>
                <IonLabel className="turnLabel ion-margin-end o-x-value" color="medium">
                  {symbols[hasWin && game.winValue ? game.winValue : turn]}
                </IonLabel>
                {hasWin ? game.getPlayer(game.winValue)?.name : game.getPlayer(turn)?.name}
              </IonCardTitle>
            </>
          )}
          {finished && !hasWin && <IonCardTitle>No winner</IonCardTitle>}
        </IonCardHeader>
      </IonCard>
      <div className="main">
        <IonGrid
          className={`ion-margin ${finished || hasWin ? 'noClick' : ''} ${
            hasWin ? `${game.getGridClassNameWin()}` : ''
          }`}
        >
          <IonRow>
            <IonCol className="cell cell-1 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(0).className : ''}
                onClick={() => handleCellClick(0)}
              >
                {symbols[game.getCell(0).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-2 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(1).className : ''}
                onClick={() => handleCellClick(1)}
              >
                {symbols[game.getCell(1).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-3 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(2).className : ''}
                onClick={() => handleCellClick(2)}
              >
                {symbols[game.getCell(2).value]}
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="cell cell-4 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(3).className : ''}
                onClick={() => handleCellClick(3)}
              >
                {symbols[game.getCell(3).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-5 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(4).className : ''}
                onClick={() => handleCellClick(4)}
              >
                {symbols[game.getCell(4).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-6 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(5).className : ''}
                onClick={() => handleCellClick(5)}
              >
                {symbols[game.getCell(5).value]}
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="cell cell-7 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(6).className : ''}
                onClick={() => handleCellClick(6)}
              >
                {symbols[game.getCell(6).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-8 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(7).className : ''}
                onClick={() => handleCellClick(7)}
              >
                {symbols[game.getCell(7).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-9 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(8).className : ''}
                onClick={() => handleCellClick(8)}
              >
                {symbols[game.getCell(8).value]}
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
      {hasWin || finished ? (
        <IonCard>
          <IonButton
            className="ion-margin"
            expand="block"
            onClick={() => {
              if (!isStoredGame) {
                setGame(
                  new Game(
                    new Player(game.player1.name, game.player1.value),
                    new Player(game.player2.name, game.player2.value),
                  ),
                );
              } else {
                setGame(undefined);
                history.push(
                  `/play?player1Name=${game.player1.name}&player1Value=${game.player1.value}&player2Name=${game.player2.name}&player2Value=${game.player2.value}&X=${symbols.X}&O=${symbols.O}`,
                );
              }
              setSaved(false);
            }}
          >
            Play Again
          </IonButton>
          {!isStoredGame && (
            <IonButton
              className="ion-margin"
              expand="block"
              onClick={() => {
                setGame(undefined);
                history.replace('/play');
                setSaved(false);
              }}
            >
              New Game
            </IonButton>
          )}
        </IonCard>
      ) : (
        <IonCard>
          <IonButton
            className="ion-margin"
            expand="block"
            onClick={() => {
              setGame(undefined);
              history.push('/play');
            }}
          >
            Cancel
          </IonButton>
        </IonCard>
      )}
    </>
  );
};
