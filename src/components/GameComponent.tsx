import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

import { CPU_THINKING_TIME } from '../constants';
import { GameStorage } from '../helpers/storage.helper';
import { useAppSelector, useCpuCellAnimation } from '../hooks';
import type { Index } from '../models/Game';
import { Game } from '../models/Game';
import { Player } from '../models/Player';
import { setCpuThinking } from '../slices/cpuSlice';
import { setCurrentGame } from '../slices/gameSlice';

export const GameComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const game = useAppSelector((state) => state.game.current!);
  const isStoredGame = useAppSelector((state) => state.game.isStoredGame);
  const cpu = useAppSelector((state) => state.cpu.current);
  const cpuThinking = useAppSelector((state) => state.cpu.thinking);
  const symbols = useAppSelector((state) => state.game.symbols);
  const height = (window.screen.availWidth * 0.86675) / 3;
  const [saved, setSaved] = useState(isStoredGame);
  const { animatedCellIndex } = useCpuCellAnimation();
  const hasWin = game?.hasWin();
  const finished = game?.finished();
  const [initialTurn] = useState(game?.getTurn());

  useEffect(() => {
    if ((hasWin || finished) && !saved) {
      GameStorage.saveGame({ date: new Date(), game, symbols });
      setSaved(true);
    }
  }, [finished, game, hasWin, saved, symbols]);

  const handleCellClick = (index: Index) => {
    if (game.getCell(index).value !== undefined || finished || hasWin) {
      return;
    }

    game.makeMove(index);

    if (game.isSinglePlayerMode()) {
      cpuMove();
    }
  };

  const cpuMove = () => {
    if (game.finished() || game.hasWin()) {
      return;
    }
    dispatch(setCpuThinking(true));
    // add a sleep to simulate the cpu thinking
    setTimeout(() => {
      const index = cpu?.chooseMove(game);
      if (index !== undefined) {
        game.makeMove(index);
      }
      dispatch(setCpuThinking(false));
    }, CPU_THINKING_TIME);
  };

  const handlePlayAgain = () => {
    const newTurn = initialTurn === 'X' ? 'O' : 'X';
    const newGame = new Game(
      new Player(game.player1.name, game.player1.value),
      new Player(game.player2.name, game.player2.value),
      game.numberOfPlayers,
      game.level,
      newTurn,
    );

    dispatch(setCurrentGame(newGame));

    // if (!isStoredGame) {
    //   dispatch(setGame(newGame));
    //   setInitialTurn(newTurn);

    //   // if it's single player mode and it's the cpu turn, then the cpu should play
    //   if (game.isSinglePlayerMode() && newTurn === game.player2.value) {
    //     cpuMove();
    //   }
    // } else {
    //   setGame(undefined);
    //   history.push(
    //     `/play?player1Name=${game.player1.name}&player1Value=${game.player1.value}&player2Name=${game.player2.name}&player2Value=${game.player2.value}&X=${symbols.X}&O=${symbols.O}&numberOfPlayers=${game.numberOfPlayers}&level=${game.level}`,
    //   );
    // }
    // setSaved(false);
  };

  const handleNewGame = () => {
    setCurrentGame(undefined);
    history.replace('/play');
    setSaved(false);
  };

  const handleCancel = () => {
    dispatch(setCurrentGame(undefined));
    history.push('/play');
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
                  {symbols?.[hasWin && game.winValue ? game.winValue : game.getTurn()]}
                </IonLabel>
                {hasWin ? game?.getPlayer(game.winValue)?.name : game?.getCurrentPlayer()?.name}
              </IonCardTitle>
            </>
          )}
          {finished && !hasWin && <IonCardTitle>No winner</IonCardTitle>}
        </IonCardHeader>
      </IonCard>
      <div id="board" className={`main ${cpuThinking ? 'non-clickable-board' : ''}`}>
        <IonGrid
          className={`ion-margin ${finished || hasWin ? 'noClick' : ''} ${
            hasWin ? `${game?.getGridClassNameWin()}` : ''
          }`}
        >
          <IonRow>
            <IonCol className="cell cell-1 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game?.getCell(0).className : `${animatedCellIndex === 0 ? 'animated' : ''}`}
                onClick={() => handleCellClick(0)}
              >
                {symbols[game?.getCell(0).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-2 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(1).className : `${animatedCellIndex === 1 ? 'animated' : ''}`}
                onClick={() => handleCellClick(1)}
              >
                {symbols[game.getCell(1).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-3 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(2).className : `${animatedCellIndex === 2 ? 'animated' : ''}`}
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
                className={hasWin ? game.getCell(3).className : `${animatedCellIndex === 3 ? 'animated' : ''}`}
                onClick={() => handleCellClick(3)}
              >
                {symbols[game.getCell(3).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-5 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(4).className : `${animatedCellIndex === 4 ? 'animated' : ''}`}
                onClick={() => handleCellClick(4)}
              >
                {symbols[game.getCell(4).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-6 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(5).className : `${animatedCellIndex === 5 ? 'animated' : ''}`}
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
                className={hasWin ? game.getCell(6).className : `${animatedCellIndex === 6 ? 'animated' : ''}`}
                onClick={() => handleCellClick(6)}
              >
                {symbols[game.getCell(6).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-8 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(7).className : `${animatedCellIndex === 7 ? 'animated' : ''}`}
                onClick={() => handleCellClick(7)}
              >
                {symbols[game.getCell(7).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-9 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(8).className : `${animatedCellIndex === 8 ? 'animated' : ''}`}
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
          <IonButton className="ion-margin" expand="block" onClick={() => handlePlayAgain()}>
            Play Again
          </IonButton>
          {!isStoredGame && (
            <IonButton className="ion-margin" expand="block" onClick={() => handleNewGame()}>
              New Game
            </IonButton>
          )}
        </IonCard>
      ) : (
        <IonCard>
          <IonButton className="ion-margin" expand="block" onClick={() => handleCancel()}>
            Cancel
          </IonButton>
        </IonCard>
      )}
    </>
  );
};
