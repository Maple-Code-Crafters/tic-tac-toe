import userEvent from '@testing-library/user-event';

import { render, safeAct, screen } from '../test-utils';
import ResultsPage from './Results';

export const fakeResults = [
  {
    date: '2024-05-20T15:59:46.863Z',
    game: {
      config: {
        id: '69635c5e-657b-4cfa-a8ff-503d528eec49',
        player1: { name: 'Player 1', value: 'X', isCpu: false },
        player2: { name: 'Player 2', value: 'O', isCpu: false },
        numberOfPlayers: 2,
        level: 'Easy',
        initialPlayerTurn: 'player2',
      },
      cells: [
        { index: 0, value: 'O', className: 'top-left-to-bottom-right' },
        { index: 1, value: 'X' },
        { index: 2, value: 'X' },
        { index: 3 },
        { index: 4, value: 'O', className: 'top-left-to-bottom-right' },
        { index: 5 },
        { index: 6 },
        { index: 7 },
        { index: 8, value: 'O', className: 'top-left-to-bottom-right' },
      ],
      gridClassNameWin: 'top-left-to-bottom-right',
      winValue: 'O',
    },
    symbols: { O: 'O', X: 'X' },
  },
  {
    date: '2024-05-20T15:59:41.298Z',
    game: {
      config: {
        id: '1d9c7ac0-81df-4eca-be5f-8effbcf8e673',
        player1: { name: 'Player 1', value: 'X', isCpu: false },
        player2: { name: 'Player 2', value: 'O', isCpu: false },
        numberOfPlayers: 2,
        level: 'Easy',
        initialPlayerTurn: 'player1',
      },
      cells: [
        { index: 0, value: 'X' },
        { index: 1, value: 'O' },
        { index: 2, value: 'O' },
        { index: 3, value: 'O' },
        { index: 4, value: 'X' },
        { index: 5, value: 'X' },
        { index: 6, value: 'X' },
        { index: 7, value: 'X' },
        { index: 8, value: 'O' },
      ],
    },
    symbols: { O: 'O', X: 'X' },
  },
  {
    date: '2024-05-20T15:58:31.364Z',
    game: {
      config: {
        id: 'fab1954c-6982-456d-97ea-dc2ba18561ef',
        player1: { name: 'Player 1', value: 'X', isCpu: false },
        player2: { name: 'CPU (Easy)', value: 'O', isCpu: true },
        numberOfPlayers: 1,
        level: 'Easy',
        initialPlayerTurn: 'player2',
      },
      cells: [
        { index: 0, value: 'O' },
        { index: 1, value: 'X' },
        { index: 2, value: 'O' },
        { index: 3, value: 'X' },
        { index: 4, value: 'O' },
        { index: 5, value: 'O' },
        { index: 6, value: 'X' },
        { index: 7, value: 'O' },
        { index: 8, value: 'X' },
      ],
    },
    symbols: { O: 'O', X: 'X' },
  },
  {
    date: '2024-05-20T15:58:19.131Z',
    game: {
      config: {
        id: '3828c843-6b1e-47dd-a1c7-a610d54abbdf',
        player1: { name: 'Player 1', value: 'X', isCpu: false },
        player2: { name: 'CPU (Easy)', value: 'O', isCpu: true },
        numberOfPlayers: 1,
        level: 'Easy',
        initialPlayerTurn: 'player1',
      },
      cells: [
        { index: 0, value: 'X', className: 'horizontal' },
        { index: 1, value: 'X', className: 'horizontal' },
        { index: 2, value: 'X', className: 'horizontal' },
        { index: 3, value: 'O' },
        { index: 4 },
        { index: 5, value: 'O' },
        { index: 6 },
        { index: 7 },
        { index: 8 },
      ],
      gridClassNameWin: 'grid-horizontal-top',
      winValue: 'X',
    },
    symbols: { O: 'O', X: 'X' },
  },
  {
    date: '2024-05-20T15:55:10.913Z',
    game: {
      config: {
        id: 'e49ec218-7b65-4de6-b165-725ec972db2a',
        player1: { name: 'Player 1', value: 'X', isCpu: false },
        player2: { name: 'CPU (Easy)', value: 'O', isCpu: true },
        numberOfPlayers: 1,
        level: 'Easy',
        initialPlayerTurn: 'player1',
      },
      cells: [
        { index: 0, value: 'X' },
        { index: 1, value: 'O' },
        { index: 2, value: 'O' },
        { index: 3, value: 'O' },
        { index: 4, value: 'X' },
        { index: 5, value: 'X' },
        { index: 6, value: 'X' },
        { index: 7, value: 'X' },
        { index: 8, value: 'O' },
      ],
    },
    symbols: { O: 'O', X: 'X' },
  },
];

describe('ResultsPage', () => {
  test('renders without crashing', async () => {
    const { baseElement } = render(<ResultsPage />);
    await safeAct();
    expect(baseElement).toBeDefined();
  });

  test('has proper texts and elements', async () => {
    render(<ResultsPage />);
    await safeAct();
    expect(screen.getByText('Results')).toBeVisible();
    expect(screen.getByText('Delete All', { selector: 'ion-button' })).toBeVisible();
  });

  test('shows saved game list and proper elements', async () => {
    render(<ResultsPage />);
    await safeAct();
    expect(screen.getAllByText('Player 1 vs', { exact: false })).toHaveLength(5);
    expect(screen.getAllByText('No winner')).toHaveLength(3);
    expect(screen.getAllByText('Winner: Player 1')).toHaveLength(1);
    expect(screen.getAllByText('Winner: Player 2')).toHaveLength(1);
    const dates = screen.getAllByText('Date:', { exact: false });
    expect(dates).toHaveLength(5);
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const [, dateMatch] = date.innerHTML.match(/Date: (.+)/)!;
      expect(dateMatch).toBe(new Date(fakeResults[i].date).toLocaleString());
    }
  });

  test('clicking a stored game shows the played game', async () => {
    const user = userEvent.setup();
    const { container } = render(<ResultsPage />);
    await safeAct();
    const dateStr = `Date: ${new Date(fakeResults[3].date).toLocaleString()}`;
    await user.click(screen.getByText(dateStr));
    expect(screen.getByText('Player 1 vs CPU (Easy)')).toBeVisible();
    expect(screen.getByText(dateStr)).toBeVisible();
    expect(screen.getByText('Back', { selector: 'ion-button' })).toBeVisible();
    expect(screen.getByText('Delete', { selector: 'ion-button' })).toBeVisible();
    expect(screen.getByText('Player 1')).toBeVisible();
    expect(screen.getByText('Winner')).toBeVisible();
    const cell1 = container.querySelector('.cell-1 > div');
    const cell2 = container.querySelector('.cell-2 > div');
    const cell3 = container.querySelector('.cell-3 > div');
    const cell4 = container.querySelector('.cell-4 > div');
    const cell5 = container.querySelector('.cell-5 > div');
    const cell6 = container.querySelector('.cell-6 > div');
    const cell7 = container.querySelector('.cell-7 > div');
    const cell8 = container.querySelector('.cell-8 > div');
    const cell9 = container.querySelector('.cell-9 > div');
    expect(cell1).toHaveTextContent('X');
    expect(cell2).toHaveTextContent('X');
    expect(cell3).toHaveTextContent('X');
    expect(cell4).toHaveTextContent('O');
    expect(cell5).toHaveTextContent('');
    expect(cell6).toHaveTextContent('O');
    expect(cell7).toHaveTextContent('');
    expect(cell8).toHaveTextContent('');
    expect(cell9).toHaveTextContent('');
    expect(screen.getByText('Play Again', { selector: 'ion-button' })).toBeVisible();
  });
});
