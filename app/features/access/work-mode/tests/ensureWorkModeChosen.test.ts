import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode";
import { ensureWorkModeChosen } from "../ensureWorkModeChosen";
import {
  MULTI_AREA_WITH_MODE,
  MULTI_AREA_WITHOUT_MODE,
  REDIRECT_SIGNAL_MESSAGE,
  SINGLE_AREA_WITH_MODE,
} from "./ensureWorkModeChosen.constants";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/app/services/work-mode", () => ({
  readWorkModeOverviewAsSignedIn: vi.fn(),
}));

describe("ensureWorkModeChosen", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it("sends a multi-area account without a mode to the selector", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue(MULTI_AREA_WITHOUT_MODE);

    await expect(ensureWorkModeChosen()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );
    expect(redirect).toHaveBeenCalledWith(PATHS.MODE);
  });

  it.each([
    [
      "a multi-area account with a mode",
      MULTI_AREA_WITH_MODE,
    ],
    ["a single-area account", SINGLE_AREA_WITH_MODE],
  ])("lets %s through", async (_name, overview) => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue(overview);

    await expect(
      ensureWorkModeChosen()
    ).resolves.toBeUndefined();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("lets a visitor without an overview through", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue(null);

    await expect(
      ensureWorkModeChosen()
    ).resolves.toBeUndefined();
    expect(redirect).not.toHaveBeenCalled();
  });
});
