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

import { CPU_THINKING_TIME } from '../constants';
import type { Symbols } from '../helpers/storage.helper';
import { GameStorage } from '../helpers/storage.helper';
import { useCpuCellAnimation } from '../hooks';
import { Cpu } from '../models/cpu/Cpu';
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
  const [_symbols] = useState<Symbols>(symbols);
  const [, setStateChange] = useState({});
  const [saved, setSaved] = useState(isStoredGame);
  const [cpuThinking, setCpuThinking] = useState(false);
  const { animatedCellIndex } = useCpuCellAnimation({ cpuThinking, game });
  const hasWin = game.hasWin();
  const finished = game.finished();
  const [cpu, setCpu] = useState<Cpu>();

  useEffect(() => {
    if ((hasWin || finished) && !saved) {
      GameStorage.saveGame({ date: new Date(), game, symbols: _symbols });
      setSaved(true);
    }
    if (game.isSinglePlayerMode() && !cpu) {
      setCpu(new Cpu(game.level));
    }
  }, [finished, game, hasWin, saved, _symbols, cpu]);

  const handleCellClick = (index: Index) => {
    if (game.getCell(index).value !== undefined || finished || hasWin) {
      return;
    }

    game.makeMove(index);

    // force re-render
    setStateChange({});

    if (game.isSinglePlayerMode()) {
      cpuMove();
    }
  };

  const cpuMove = () => {
    if (game.finished() || game.hasWin()) {
      return;
    }
    setCpuThinking(true);
    // add a sleep to simulate the cpu thinking
    setTimeout(() => {
      let index = cpu?.chooseMove(game);
      if (index !== undefined) {
        game.makeMove(index);
      }
      setCpuThinking(false);
    }, CPU_THINKING_TIME);
  };

  const handlePlayAgain = () => {
    if (!isStoredGame) {
      setGame(
        new Game(
          new Player(game.player1.name, game.player1.value),
          new Player(game.player2.name, game.player2.value),
          game.numberOfPlayers,
          game.level,
        ),
      );
    } else {
      setGame(undefined);
      history.push(
        `/play?player1Name=${game.player1.name}&player1Value=${game.player1.value}&player2Name=${game.player2.name}&player2Value=${game.player2.value}&X=${_symbols.X}&O=${_symbols.O}&numberOfPlayers=${game.numberOfPlayers}`,
      );
    }
    setSaved(false);
  };

  const handleNewGame = () => {
    setGame(undefined);
    history.replace('/play');
    setSaved(false);
  };

  const handleCancel = () => {
    setGame(undefined);
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
                  {_symbols[hasWin && game.winValue ? game.winValue : game.getTurn()]}
                </IonLabel>
                {hasWin ? game.getPlayer(game.winValue)?.name : game.getCurrentPlayer()?.name}
              </IonCardTitle>
            </>
          )}
          {finished && !hasWin && <IonCardTitle>No winner</IonCardTitle>}
        </IonCardHeader>
      </IonCard>
      <div id="board" className={`main ${cpuThinking ? 'non-clickable-board' : ''}`}>
        <IonGrid
          className={`ion-margin ${finished || hasWin ? 'noClick' : ''} ${
            hasWin ? `${game.getGridClassNameWin()}` : ''
          }`}
        >
          <IonRow>
            <IonCol className="cell cell-1 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(0).className : `${animatedCellIndex === 0 ? 'animated' : ''}`}
                onClick={() => handleCellClick(0)}
              >
                {_symbols[game.getCell(0).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-2 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(1).className : `${animatedCellIndex === 1 ? 'animated' : ''}`}
                onClick={() => handleCellClick(1)}
              >
                {_symbols[game.getCell(1).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-3 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(2).className : `${animatedCellIndex === 2 ? 'animated' : ''}`}
                onClick={() => handleCellClick(2)}
              >
                {_symbols[game.getCell(2).value]}
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
                {_symbols[game.getCell(3).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-5 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(4).className : `${animatedCellIndex === 4 ? 'animated' : ''}`}
                onClick={() => handleCellClick(4)}
              >
                {_symbols[game.getCell(4).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-6 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(5).className : `${animatedCellIndex === 5 ? 'animated' : ''}`}
                onClick={() => handleCellClick(5)}
              >
                {_symbols[game.getCell(5).value]}
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
                {_symbols[game.getCell(6).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-8 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(7).className : `${animatedCellIndex === 7 ? 'animated' : ''}`}
                onClick={() => handleCellClick(7)}
              >
                {_symbols[game.getCell(7).value]}
              </div>
            </IonCol>
            <IonCol className="cell cell-9 o-x-value">
              <div
                style={{ height }}
                className={hasWin ? game.getCell(8).className : `${animatedCellIndex === 8 ? 'animated' : ''}`}
                onClick={() => handleCellClick(8)}
              >
                {_symbols[game.getCell(8).value]}
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
