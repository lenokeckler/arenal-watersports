import { render, screen } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import {
  PATHS,
  SUPABASE_WORK_AREA,
  WORK_AREA_LABEL,
} from "@/app/constants";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode";
import { ensureWorkModeChosen } from "@/app/services/work-mode/ensureWorkModeChosen";
import WorkModeGate from "../WorkModeGate";
import WorkModeSelector from "../WorkModeSelector";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("@/app/services/work-mode", () => ({
  readWorkModeOverviewAsSignedIn: vi.fn(),
}));

vi.mock(
  "@/app/services/work-mode/ensureWorkModeChosen",
  () => ({
    ensureWorkModeChosen: vi.fn(),
  })
);

const BOTH = [
  SUPABASE_WORK_AREA.RESERVATIONS,
  SUPABASE_WORK_AREA.OPERATIONS,
];

describe("WorkModeSelector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows one large card per enabled area, Operaciones first", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue({
      areas: BOTH,
      current: null,
    });

    render(await WorkModeSelector());

    expect(
      screen
        .getAllByRole("button")
        .map((button) => button.textContent)
    ).toEqual([
      expect.stringContaining(
        WORK_AREA_LABEL[SUPABASE_WORK_AREA.OPERATIONS]
      ),
      expect.stringContaining(
        WORK_AREA_LABEL[SUPABASE_WORK_AREA.RESERVATIONS]
      ),
    ]);
  });

  it("sends an account with a single area to the home", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue({
      areas: [SUPABASE_WORK_AREA.OPERATIONS],
      current: SUPABASE_WORK_AREA.OPERATIONS,
    });

    await expect(WorkModeSelector()).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("sends a visitor without an account to the login", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue(null);

    await expect(WorkModeSelector()).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.LOGIN
    );
  });
});

describe("WorkModeGate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("propagates a redirect from the work-mode service", async () => {
    const redirectError = new Error();
    vi.mocked(ensureWorkModeChosen).mockRejectedValue(
      redirectError
    );

    await expect(WorkModeGate()).rejects.toBe(
      redirectError
    );
    expect(ensureWorkModeChosen).toHaveBeenCalledOnce();
  });

  it("continues when the work-mode service resolves", async () => {
    vi.mocked(ensureWorkModeChosen).mockResolvedValue();

    expect(await WorkModeGate()).toBeNull();
    expect(ensureWorkModeChosen).toHaveBeenCalledOnce();
  });
});
