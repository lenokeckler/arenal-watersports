import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_ROLE, KEYBOARD } from "@/app/constants";
import DayPanel from "../DayPanel";

const replace = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

const TITLE = "10 nov";
const CLOSE_HREF = "/operations/maintenance?month=2026-11";

const renderPanel = (isOpen: boolean) =>
  render(
    <DayPanel
      closeHref={CLOSE_HREF}
      isOpen={isOpen}
      title={TITLE}
    >
      <span>detalle</span>
    </DayPanel>
  );

const pretendWideScreen = () =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      addEventListener: vi.fn(),
      matches: true,
      removeEventListener: vi.fn(),
    }))
  );

describe("DayPanel", () => {
  afterEach(() => {
    cleanup();
    replace.mockReset();
    vi.unstubAllGlobals();
  });

  it("stays hidden on a phone until the day is touched", () => {
    renderPanel(false);

    expect(
      screen.queryByText("detalle")
    ).not.toBeInTheDocument();
  });

  it("opens a sheet on a phone and closes it without adding history", () => {
    renderPanel(true);

    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      TITLE
    );

    fireEvent.keyDown(document, { key: KEYBOARD.ESCAPE });

    expect(replace).toHaveBeenCalledWith(CLOSE_HREF, {
      scroll: false,
    });
  });

  it("sits beside the calendar on a wide screen", () => {
    pretendWideScreen();

    renderPanel(false);

    expect(
      screen.getByRole(ARIA_ROLE.COMPLEMENTARY)
    ).toHaveTextContent("detalle");
    expect(
      screen.queryByRole("dialog")
    ).not.toBeInTheDocument();
  });
});
