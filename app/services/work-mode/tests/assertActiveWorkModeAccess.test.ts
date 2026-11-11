import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { redirect } from "next/navigation";
import { readWorkModeOverviewAsSignedIn } from "../readWorkModeOverviewAsSignedIn";
import { assertActiveWorkModeAccess } from "../assertActiveWorkModeAccess";
import { ACTIVE_WORK_MODE_AREAS } from "./ActiveWorkModeAccess.constants";

vi.mock("next/navigation", () => ({
  redirect: vi.fn((path: string) => {
    throw new Error(path);
  }),
}));
vi.mock("../readWorkModeOverviewAsSignedIn", () => ({
  readWorkModeOverviewAsSignedIn: vi.fn(),
}));

describe("assertActiveWorkModeAccess", () => {
  beforeEach(() => vi.clearAllMocks());

  it("redirects an expired session to login", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue(null);
    await expect(
      assertActiveWorkModeAccess()
    ).rejects.toThrow(PATHS.ACCESS.LOGIN);
  });

  it("requires an active mode selection", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue({
      areas: ACTIVE_WORK_MODE_AREAS,
      current: null,
    });
    await expect(
      assertActiveWorkModeAccess()
    ).rejects.toThrow(PATHS.MODE);
  });

  it.each(ACTIVE_WORK_MODE_AREAS)(
    "allows the %s active mode",
    async (area) => {
      vi.mocked(
        readWorkModeOverviewAsSignedIn
      ).mockResolvedValue({ areas: [area], current: area });
      await expect(
        assertActiveWorkModeAccess()
      ).resolves.toBeUndefined();
      expect(redirect).not.toHaveBeenCalled();
    }
  );
});
