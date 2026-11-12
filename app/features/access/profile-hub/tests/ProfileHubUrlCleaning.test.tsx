import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { UNKNOWN_NOTICE } from "./ProfileHub.constants";
import { renderProfileHub } from "./renderProfileHub";
import {
  NOTICE_URL_CASES,
  UNKNOWN_NOTICE_URL,
} from "./ProfileHubUrlCleaning.constants";

vi.mock("@/app/services/authentication", () => ({
  readOwnPersonalEmail: vi.fn(),
}));

const readCurrentUrl = (): string =>
  `${window.location.pathname}${window.location.search}`;

describe("ProfileHub url cleaning", () => {
  afterEach(() => {
    window.history.replaceState(
      window.history.state,
      document.title,
      PATHS.PROFILE.ROOT
    );
  });

  it.each(NOTICE_URL_CASES)(
    "cleans the url when the hub showed the %s notice",
    async (notice, url) => {
      window.history.replaceState(
        window.history.state,
        document.title,
        url
      );

      await renderProfileHub(notice);

      expect(readCurrentUrl()).toBe(PATHS.PROFILE.ROOT);
    }
  );

  it("leaves the url alone when the hub showed no notice", async () => {
    window.history.replaceState(
      window.history.state,
      document.title,
      UNKNOWN_NOTICE_URL
    );

    await renderProfileHub(UNKNOWN_NOTICE);

    expect(readCurrentUrl()).toBe(UNKNOWN_NOTICE_URL);
  });
});
