import type { Cell, Value } from '../Cell';
import type { Game, Index } from '../Game';
import type { CpuAlgorithm } from './CpuAlgorithm';

type Board = [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]];

/**
 * References:
 * https://www.geeksforgeeks.org/finding-optimal-move-in-tic-tac-toe-using-minimax-algorithm-in-game-theory/
 */

class Move {
  constructor(
    public row: number,
    public col: number,
  ) {}
}

export class Minimax implements CpuAlgorithm {
  private player: Value = 'X';
  private opponent: Value = 'O';

  /**
   * This function returns true if there are moves
   * remaining on the board. It returns false if
   * there are no moves left to play.
   * @param board
   * @returns
   */
  private isMovesLeft(board: Board) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j].value === undefined) {
          return true;
        }
      }
    }

    return false;
  }

  // This is the evaluation function as discussed
  // in the previous article ( http://goo.gl/sJgv68 )

  /**
   * This is the evaluation function as discussed
   * in the previous article ( http://goo.gl/sJgv68 )
   * @param board
   * @returns
   */
  private evaluate(board: Board) {
    // Checking for Rows for X or O victory.
    for (let row = 0; row < 3; row++) {
      if (board[row][0].value === board[row][1].value && board[row][1].value === board[row][2].value) {
        if (board[row][0].value === this.player) {
          return +10;
        } else if (board[row][0].value === this.opponent) {
          return -10;
        }
      }
    }

    // Checking for Columns for X or O victory.
    for (let col = 0; col < 3; col++) {
      if (board[0][col].value === board[1][col].value && board[1][col].value === board[2][col].value) {
        if (board[0][col].value === this.player) {
          return +10;
        } else if (board[0][col].value === this.opponent) {
          return -10;
        }
      }
    }

    // Checking for Diagonals for X or O victory.
    if (board[0][0].value === board[1][1].value && board[1][1].value === board[2][2].value) {
      if (board[0][0].value === this.player) {
        return +10;
      } else if (board[0][0].value === this.opponent) {
        return -10;
      }
    }

    if (board[0][2].value === board[1][1].value && board[1][1].value === board[2][0].value) {
      if (board[0][2].value === this.player) {
        return +10;
      } else if (board[0][2].value === this.opponent) {
        return -10;
      }
    }

    // Else if none of them have
    // won then return 0
    return 0;
  }

  /**
   * This is the minimax function. It
   * considers all the possible ways
   * the game can go and returns the
   * value of the board
   * @param board
   * @param depth
   * @param isMax
   * @returns
   */
  private minimax(board: Board, depth: number, isMax: boolean) {
    const score = this.evaluate(board);

    // If Maximizer has won the game
    // return his/her evaluated score
    if (score === 10) {
      return score;
    }

    // If Minimizer has won the game
    // return his/her evaluated score
    if (score === -10) {
      return score;
    }

    // If there are no more moves and
    // no winner then it is a tie
    if (this.isMovesLeft(board) === false) {
      return 0;
    }

    // If this maximizer's move
    if (isMax) {
      let best = -1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j].value === undefined) {
            // Make the move
            board[i][j].value = this.player;

            // Call minimax recursively
            // and choose the maximum value
            best = Math.max(best, this.minimax(board, depth + 1, !isMax));

            // Undo the move
            board[i][j].value = undefined;
          }
        }
      }

      return best;
    }

    // If this minimizer's move
    else {
      let best = 1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j].value === undefined) {
            // Make the move
            board[i][j].value = this.opponent;

            // Call minimax recursively and
            // choose the minimum value
            best = Math.min(best, this.minimax(board, depth + 1, !isMax));

            // Undo the move
            board[i][j].value = undefined;
          }
        }
      }
      return best;
    }
  }

  /**
   * This will return the best possible
   * move for the player
   * @param board
   * @returns
   */
  private findBestMove(board: Board) {
    let bestVal = -1000;
    const bestMove = new Move(-1, -1);

    // Traverse all cells, evaluate
    // minimax function for all empty
    // cells. And return the cell
    // with optimal value.
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j].value === undefined) {
          // Make the move
          board[i][j].value = this.player;

          // compute evaluation function
          // for this move.
          const moveVal = this.minimax(board, 0, false);

          // Undo the move
          board[i][j].value = undefined;

          // If the value of the current move
          // is more than the best value, then
          // update best
          if (moveVal > bestVal) {
            bestMove.row = i;
            bestMove.col = j;
            bestVal = moveVal;
          }
        }
      }
    }

    return bestMove;
  }

  public chooseMove(game: Game): Index {
    if (game.player1.isCpu) {
      this.player = game.player1.value;
      this.opponent = game.player2.value;
    } else {
      this.player = game.player2.value;
      this.opponent = game.player1.value;
    }

    const board: Board = [
      [game.getCell(0).clone(), game.getCell(1).clone(), game.getCell(2).clone()],
      [game.getCell(3).clone(), game.getCell(4).clone(), game.getCell(5).clone()],
      [game.getCell(6).clone(), game.getCell(7).clone(), game.getCell(8).clone()],
    ];
    const bestMove = this.findBestMove(board);
    const index = board[bestMove.row][bestMove.col].index;
    return index;
  }
}
