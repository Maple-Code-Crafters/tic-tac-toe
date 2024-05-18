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
    const startButton = screen.getByText('Start');
    expect(startButton).toBeVisible();
    expect(startButton).toContainHTML('ion-button');
  });

  test('selecting two players removes CPU level options', async () => {
    const user = userEvent.setup();
    render(<PlayPage />);
    await safeAct();
    const easy = screen.getByText('Easy');
    const medium = screen.getByText('Easy');
    const hard = screen.getByText('Easy');
    await user.click(screen.getByText('Two Players'));
    expect(easy).not.toBeVisible();
    expect(medium).not.toBeVisible();
    expect(hard).not.toBeVisible();
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
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeVisible();
    expect(cancelButton).toContainHTML('ion-button');
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
});
