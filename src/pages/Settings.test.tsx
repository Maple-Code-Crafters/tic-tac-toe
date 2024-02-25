import { render } from "../test-utils";
import SettingsPage from "./Settings";

describe("SettingsPage", () => {
  test("renders without crashing", () => {
    const { baseElement } = render(<SettingsPage />);
    expect(baseElement).toBeDefined();
  });

  // TODO: add more tests
});
