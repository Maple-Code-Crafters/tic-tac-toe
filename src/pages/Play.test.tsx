import { render, screen } from '../test-utils';
import PlayPage from './Play';

describe('PlayPage', () => {
  test('renders without crashing', () => {
    const { baseElement } = render(<PlayPage />);
    expect(baseElement).toBeDefined();
  });

  test('has proper texts and elements', () => {
    render(<PlayPage />);
    expect(screen.getByText('New Game')).toBeVisible();
    expect(screen.getByText('Select Players')).toBeVisible();
    expect(screen.getByText('One Player')).toBeVisible();
    expect(screen.getByText('Two Players')).toBeVisible();
    expect(screen.getByText('Easy')).toBeVisible();
    expect(screen.getByText('Medium')).toBeVisible();
    expect(screen.getByText('Hard')).toBeVisible();
    expect(screen.getAllByText('O')).toHaveLength(2);
    expect(screen.getAllByText('X')).toHaveLength(2);
    expect(screen.getByPlaceholderText('Enter player 1 name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter player 2 name')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeVisible();
  });
});
