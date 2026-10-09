import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render } from "@testing-library/react";
import { PATHS } from "@/app/constants";
import ProfileNoticeUrlCleaner from "../ProfileNoticeUrlCleaner";
import { UNKNOWN_NOTICE } from "./ProfileHub.constants";
import { renderProfileHub } from "./renderProfileHub";
import {
  NOTICE_URL,
  NOTICE_URL_CASES,
  UNKNOWN_NOTICE_URL,
} from "./ProfileNoticeUrlCleaner.constants";

vi.mock("@/app/services/authentication", () => ({
  readOwnPersonalEmail: vi.fn(),
}));

const readCurrentUrl = (): string =>
  `${window.location.pathname}${window.location.search}`;

describe("ProfileNoticeUrlCleaner", () => {
  afterEach(() => {
    window.history.replaceState(
      window.history.state,
      document.title,
      PATHS.PROFILE.ROOT
    );
  });

  it("replaces the notice url with the profile root", () => {
    window.history.replaceState(
      window.history.state,
      document.title,
      NOTICE_URL
    );

    render(<ProfileNoticeUrlCleaner />);

    expect(readCurrentUrl()).toBe(PATHS.PROFILE.ROOT);
  });

  it("renders nothing", () => {
    const { container } = render(
      <ProfileNoticeUrlCleaner />
    );

    expect(container).toBeEmptyDOMElement();
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
