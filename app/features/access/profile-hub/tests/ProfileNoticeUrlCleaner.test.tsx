import { afterEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PATHS, PROFILE_NOTICE } from "@/app/constants";
import ProfileHub from "../ProfileHub";
import ProfileNoticeUrlCleaner from "../ProfileNoticeUrlCleaner";
import { UNKNOWN_NOTICE } from "./ProfileHub.constants";
import {
  NOTICE_URL,
  UNKNOWN_NOTICE_URL,
} from "./ProfileNoticeUrlCleaner.constants";

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

  it("cleans the url when the hub showed a notice", () => {
    window.history.replaceState(
      window.history.state,
      document.title,
      NOTICE_URL
    );

    render(
      <ProfileHub
        notice={PROFILE_NOTICE.PASSWORD_CHANGED}
      />
    );

    expect(readCurrentUrl()).toBe(PATHS.PROFILE.ROOT);
  });

  it("leaves the url alone when the hub showed no notice", () => {
    window.history.replaceState(
      window.history.state,
      document.title,
      UNKNOWN_NOTICE_URL
    );

    render(<ProfileHub notice={UNKNOWN_NOTICE} />);

    expect(readCurrentUrl()).toBe(UNKNOWN_NOTICE_URL);
  });
});
