import { render } from "./test-utils";
import App from "./App";

describe("App", () => {
  test("renders without crashing", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
  });
});
