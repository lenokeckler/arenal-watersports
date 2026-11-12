import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render, within } from "@testing-library/react";
import { useRealtimeRefresh } from "@/app/components/realtime/hooks/useRealtimeRefresh";
import CategoryUnitsRealtime from "../CategoryUnitsRealtime";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { createCategoryUnitsRealtimePage } from "./CategoryUnitsRealtime.page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock(
  "@/app/components/realtime/hooks/useRealtimeRefresh",
  () => ({ useRealtimeRefresh: vi.fn() })
);

describe("CategoryUnitsRealtime", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows nothing while live updates are connected", () => {
    vi.mocked(useRealtimeRefresh).mockReturnValue(false);
    render(<CategoryUnitsRealtime />);

    expect(
      createCategoryUnitsRealtimePage().queryNotice()
    ).not.toBeInTheDocument();
  });

  it("warns that the board may be stale when live updates are down", () => {
    vi.mocked(useRealtimeRefresh).mockReturnValue(true);
    render(<CategoryUnitsRealtime />);
    const notice =
      createCategoryUnitsRealtimePage().getNotice();

    expect(
      within(notice).getByText(
        CATEGORY_UNITS_COPY.LIVE_UPDATES_LOST_TITLE
      )
    ).toBeInTheDocument();
    expect(
      within(notice).getByText(
        CATEGORY_UNITS_COPY.LIVE_UPDATES_LOST_BODY
      )
    ).toBeInTheDocument();
  });
});
