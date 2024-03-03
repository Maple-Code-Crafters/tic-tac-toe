import { render } from '../test-utils';
import PlayPage from './Play';

describe('PlayPage', () => {
  test('renders without crashing', () => {
    const { baseElement } = render(<PlayPage />);
    expect(baseElement).toBeDefined();
  });

  // TODO: add more tests
});
