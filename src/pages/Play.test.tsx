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
    expect(screen.getByDisplayValue('Player 2')).toBeVisible();
    const startButton = screen.getByText('Start');
    expect(startButton).toBeVisible();
    expect(startButton).toContainHTML('ion-button');
  });
});
