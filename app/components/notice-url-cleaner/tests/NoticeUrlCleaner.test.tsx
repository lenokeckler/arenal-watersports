import { afterEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import NoticeUrlCleaner from "../NoticeUrlCleaner";
import {
  CLEAN_PATH_CASES,
  HISTORY_STATE,
  RESET_PATH,
} from "./NoticeUrlCleaner.constants";

const readCurrentUrl = (): string =>
  `${window.location.pathname}${window.location.search}`;

describe("NoticeUrlCleaner", () => {
  afterEach(() => {
    window.history.replaceState(
      null,
      document.title,
      RESET_PATH
    );
  });

  it.each(CLEAN_PATH_CASES)(
    "replaces %s with the path to keep",
    (noticeUrl, cleanPath) => {
      window.history.replaceState(
        window.history.state,
        document.title,
        noticeUrl
      );

      render(<NoticeUrlCleaner cleanPath={cleanPath} />);

      expect(readCurrentUrl()).toBe(cleanPath);
    }
  );

  it("keeps the history state", () => {
    const [[noticeUrl, cleanPath]] = CLEAN_PATH_CASES;
    window.history.replaceState(
      HISTORY_STATE,
      document.title,
      noticeUrl
    );

    render(<NoticeUrlCleaner cleanPath={cleanPath} />);

    expect(window.history.state).toEqual(HISTORY_STATE);
  });

  it("renders nothing", () => {
    const [[, cleanPath]] = CLEAN_PATH_CASES;

    const { container } = render(
      <NoticeUrlCleaner cleanPath={cleanPath} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
