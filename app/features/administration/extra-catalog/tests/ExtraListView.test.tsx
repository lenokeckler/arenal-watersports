import { refreshMock } from "./extraCardActions.harness";
import { beforeEach, describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import { EXTRA_STATUS_LABEL } from "../constants/ExtraStatusLabel.constants";
import { resolveExtraEditPath } from "../utils/resolveExtraEditPath";
import { DEFAULT_EXTRA } from "./Extra.constants";
import {
  buildExtra,
  MIDDLE_PAGE,
  MIDDLE_PAGE_COUNT,
  SECOND_EXTRA_ID,
  SECOND_EXTRA_NAME,
} from "./ExtraList.constants";
import { createExtraListPage } from "./ExtraList.page";
import { renderExtraListView } from "./renderExtraListView";

describe("ExtraListView", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("titles the screen and links to the new extra route", () => {
    renderExtraListView();
    const extraListPage = createExtraListPage();

    expect(extraListPage.getTitle()).toBeInTheDocument();
    expect(extraListPage.getCreateLink()).toHaveAttribute(
      "href",
      PATHS.ADMINISTRATION.EXTRAS_NEW
    );
  });

  it("shows one card per extra with its edit link", () => {
    renderExtraListView({
      extras: [
        DEFAULT_EXTRA,
        buildExtra({
          id: SECOND_EXTRA_ID,
          name: SECOND_EXTRA_NAME,
        }),
      ],
    });
    const extraListPage = createExtraListPage();

    expect(
      extraListPage.getEditLink(DEFAULT_EXTRA.name)
    ).toHaveAttribute(
      "href",
      resolveExtraEditPath(DEFAULT_EXTRA.id)
    );
    expect(
      extraListPage.getEditLink(SECOND_EXTRA_NAME)
    ).toHaveAttribute(
      "href",
      resolveExtraEditPath(SECOND_EXTRA_ID)
    );
  });

  it.each(Object.values(EXTRA_STATUS))(
    "shows the label of the %s status as a word on the card",
    (status) => {
      renderExtraListView({
        extras: [buildExtra({ status })],
      });

      expect(
        createExtraListPage().getStatusLabel(
          DEFAULT_EXTRA.name,
          EXTRA_STATUS_LABEL[status]
        )
      ).toBeInTheDocument();
    }
  );

  it("shows the empty state when there are no extras", () => {
    renderExtraListView({ extras: [] });
    const extraListPage = createExtraListPage();

    expect(
      extraListPage.getEmptyStateTitle()
    ).toBeInTheDocument();
    expect(
      extraListPage.getCard(DEFAULT_EXTRA.name)
    ).not.toBeInTheDocument();
  });

  it("shows the error and refreshes the page on retry", async () => {
    renderExtraListView({ extras: [], fetchFailed: true });
    const extraListPage = createExtraListPage();

    expect(
      extraListPage.getErrorMessage()
    ).toBeInTheDocument();
    await extraListPage.clickRetry();

    expect(refreshMock).toHaveBeenCalledTimes(1);
  });

  it("links to the previous and next pages of the extras", () => {
    renderExtraListView({
      currentPage: MIDDLE_PAGE,
      pageCount: MIDDLE_PAGE_COUNT,
    });
    const extraListPage = createExtraListPage();

    expect(extraListPage.getPreviousLink()).toHaveAttribute(
      "href",
      resolveListPageHref(
        PATHS.ADMINISTRATION.EXTRAS,
        MIDDLE_PAGE - 1
      )
    );
    expect(extraListPage.getNextLink()).toHaveAttribute(
      "href",
      resolveListPageHref(
        PATHS.ADMINISTRATION.EXTRAS,
        MIDDLE_PAGE + 1
      )
    );
  });
});
