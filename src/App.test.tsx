import App from './App';
import { render } from './test-utils';

describe('App', () => {
  test('renders without crashing', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
  });
});
