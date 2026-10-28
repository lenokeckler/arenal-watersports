import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render } from "@testing-library/react";
import SessionBar from "../SessionBar";
import { LOGOUT_COPY } from "../constants/LogoutCopy.constants";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import { useLogoutViewModel } from "../hooks/useLogoutViewModel";
import {
  ANNOUNCEMENT,
  ERROR_MESSAGE,
  IDLE_PROPS,
} from "./SessionBarView.constants";
import { createSessionBarViewPage } from "./SessionBarView.page";

vi.mock("../hooks/useLogoutViewModel", () => ({
  useLogoutViewModel: vi.fn(),
}));

describe("SessionBar", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("calls handlePress from the view model when the button is pressed", async () => {
    const handlePress = vi.fn();
    vi.mocked(useLogoutViewModel).mockReturnValue({
      ...IDLE_PROPS,
      handlePress,
    });
    render(<SessionBar />);
    const page = createSessionBarViewPage();

    await page.press(LOGOUT_COPY.BUTTON);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("passes the phase to the view", () => {
    vi.mocked(useLogoutViewModel).mockReturnValue({
      ...IDLE_PROPS,
      phase: LOGOUT_PHASE.CONFIRMING,
    });
    render(<SessionBar />);
    const page = createSessionBarViewPage();

    expect(
      page.getButton(LOGOUT_COPY.CONFIRM)
    ).toBeInTheDocument();
  });

  it("passes the pending announcement to the view", () => {
    vi.mocked(useLogoutViewModel).mockReturnValue({
      ...IDLE_PROPS,
      phase: LOGOUT_PHASE.PENDING,
      pendingAnnouncement: ANNOUNCEMENT,
    });
    render(<SessionBar />);
    const page = createSessionBarViewPage();

    expect(page.getStatus()).toHaveTextContent(
      ANNOUNCEMENT
    );
  });

  it("passes the error message to the view", () => {
    vi.mocked(useLogoutViewModel).mockReturnValue({
      ...IDLE_PROPS,
      phase: LOGOUT_PHASE.FAILED,
      errorMessage: ERROR_MESSAGE,
    });
    render(<SessionBar />);
    const page = createSessionBarViewPage();

    expect(page.queryAlert()).toHaveTextContent(
      ERROR_MESSAGE
    );
  });
});
