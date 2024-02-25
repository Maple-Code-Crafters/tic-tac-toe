import { render } from "../test-utils";
import ResultsPage from "./Results";

describe("ResultsPage", () => {
  test("renders without crashing", () => {
    const { baseElement } = render(<ResultsPage />);
    expect(baseElement).toBeDefined();
  });

  // TODO: add more tests
});
