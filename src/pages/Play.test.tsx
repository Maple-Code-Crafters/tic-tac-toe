import userEvent from '@testing-library/user-event';

import { render, safeAct, screen } from '../test-utils';
import PlayPage from './Play';

describe('PlayPage', () => {
  test('renders without crashing', () => {
    const { baseElement } = render(<PlayPage />);

    expect(baseElement).toBeDefined();
  });

  test('has proper texts and elements', async () => {
    render(<PlayPage />);
    await safeAct();
    expect(screen.getByText('New Game')).toBeVisible();
    expect(screen.getByText('Select Players')).toBeVisible();
    expect(screen.getByText('One Player')).toBeVisible();
    expect(screen.getByText('Two Players')).toBeVisible();
    expect(screen.getByText('Easy')).toBeVisible();
    expect(screen.getByText('Medium')).toBeVisible();
    expect(screen.getByText('Hard')).toBeVisible();
    expect(screen.getAllByText('O')).toHaveLength(2);
    expect(screen.getAllByText('X')).toHaveLength(2);
    expect(screen.getByDisplayValue('Player 1')).toBeVisible();
    expect(screen.getByDisplayValue('CPU (Easy)')).toBeVisible();
    expect(screen.getByText('Start', { selector: 'ion-button' })).toBeVisible();
  });

  test('selecting two players removes CPU level options', async () => {
    const user = userEvent.setup();
    render(<PlayPage />);
    await safeAct();
    const easy = screen.getByText('Easy');
    const medium = screen.getByText('Medium');
    const hard = screen.getByText('Hard');
    screen.getByDisplayValue('CPU (Easy)');
    await user.click(screen.getByText('Two Players'));
    expect(easy).not.toBeVisible();
    expect(medium).not.toBeVisible();
    expect(hard).not.toBeVisible();
    expect(screen.getByDisplayValue('Player 2')).toBeVisible();
  });

  test('clicking start starts a game', async () => {
    const user = userEvent.setup();
    const { container } = render(<PlayPage />);
    await safeAct();
    await user.click(screen.getByText('Start'));
    expect(screen.getByText('Player 1')).toBeVisible();
    expect(screen.getByText('Player turn')).toBeVisible();
    const cells = container.getElementsByClassName('cell');
    expect(cells).toHaveLength(9);
    for (const cell of cells) {
      expect(cell).toHaveTextContent('');
    }
    expect(screen.getByText('Cancel', { selector: 'ion-button' })).toBeVisible();
  });

  test('clicking cancel cancels a game', async () => {
    const user = userEvent.setup();
    render(<PlayPage />);
    await safeAct();
    await user.click(screen.getByText('Start'));
    expect(screen.getByText('Player turn')).toBeVisible();
    await user.click(screen.getByText('Cancel'));
    expect(screen.getByText('Select Players')).toBeVisible();
  });

  test('Two players game and player 1 wins the game', async () => {
    const user1 = userEvent.setup();
    const user2 = userEvent.setup();
    const { container } = render(<PlayPage />);
    await safeAct();
    await user1.click(screen.getByText('Two Players'));
    await user1.click(screen.getByText('Start'));
    const cell1 = container.querySelector('.cell-1 > div');
    await user1.click(cell1!);
    const cell2 = container.querySelector('.cell-2 > div');
    await user2.click(cell2!);
    const cell4 = container.querySelector('.cell-5 > div');
    await user1.click(cell4!);
    const cell5 = container.querySelector('.cell-6 > div');
    await user2.click(cell5!);
    const cell9 = container.querySelector('.cell-9 > div');
    await user1.click(cell9!);
    expect(screen.getByText('Player 1')).toBeVisible();
    expect(screen.getByText('Winner')).toBeVisible();
    expect(screen.getByText('Play Again')).toBeVisible();
    expect(screen.getByText('New Game', { selector: 'ion-button' })).toBeVisible();
  });
});
