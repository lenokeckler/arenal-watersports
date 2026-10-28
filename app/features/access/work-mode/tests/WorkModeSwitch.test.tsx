import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  PATHS,
  SUPABASE_WORK_AREA,
  WORK_AREA_LABEL,
} from "@/app/constants";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode";
import { WORK_MODE_COPY } from "../constants/WorkModeCopy.constants";
import WorkModeSwitch from "../WorkModeSwitch";

vi.mock("@/app/services/work-mode", () => ({
  readWorkModeOverviewAsSignedIn: vi.fn(),
}));

const BOTH = [
  SUPABASE_WORK_AREA.RESERVATIONS,
  SUPABASE_WORK_AREA.OPERATIONS,
];

describe("WorkModeSwitch", () => {
  it("shows the current mode and links to the selector", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue({
      areas: BOTH,
      current: SUPABASE_WORK_AREA.RESERVATIONS,
    });

    const element = await WorkModeSwitch();
    render(element ?? <></>);

    expect(
      screen.getByText(
        WORK_MODE_COPY.SWITCH_LABEL(
          WORK_AREA_LABEL[SUPABASE_WORK_AREA.RESERVATIONS]
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: WORK_MODE_COPY.SWITCH,
      })
    ).toHaveAttribute("href", PATHS.MODE);
  });

  it.each([
    [
      {
        areas: [SUPABASE_WORK_AREA.OPERATIONS],
        current: SUPABASE_WORK_AREA.OPERATIONS,
      },
    ],
    [{ areas: BOTH, current: null }],
    [null],
  ])("shows nothing for %j", async (overview) => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue(overview);

    expect(await WorkModeSwitch()).toBeNull();
  });
});
