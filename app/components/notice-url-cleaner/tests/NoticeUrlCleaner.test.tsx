import { afterEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import NoticeUrlCleaner from "../NoticeUrlCleaner";
import { createNoticeUrlCleanerPage } from "./NoticeUrlCleaner.page";
import {
  CLEAN_PATH_CASES,
  HISTORY_STATE,
  RESET_PATH,
} from "./NoticeUrlCleaner.constants";

const page = createNoticeUrlCleanerPage();

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

      expect(page.getCurrentUrl()).toBe(cleanPath);
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

    expect(page.getHistoryState()).toEqual(HISTORY_STATE);
  });

  it("cleans the url only once while the path to keep is unchanged", () => {
    const [[noticeUrl, cleanPath]] = CLEAN_PATH_CASES;
    window.history.replaceState(
      window.history.state,
      document.title,
      noticeUrl
    );
    const { rerender } = render(
      <NoticeUrlCleaner cleanPath={cleanPath} />
    );
    window.history.replaceState(
      window.history.state,
      document.title,
      noticeUrl
    );

    rerender(<NoticeUrlCleaner cleanPath={cleanPath} />);

    expect(page.getCurrentUrl()).toBe(noticeUrl);
  });

  it("renders nothing", () => {
    const [[, cleanPath]] = CLEAN_PATH_CASES;

    const { container } = render(
      <NoticeUrlCleaner cleanPath={cleanPath} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
