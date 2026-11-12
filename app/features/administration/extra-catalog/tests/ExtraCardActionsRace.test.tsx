import { deleteOrDeactivateMock } from "./extraCardActions.harness";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type { ExtraRemovalResult } from "../models/ExtraRemovalResult.type";
import { createDeferred } from "./createDeferred";
import { DEFAULT_EXTRA } from "./Extra.constants";
import { DELETED_REMOVAL_RESULT } from "./ExtraCardActions.constants";
import {
  buildExtra,
  SECOND_EXTRA_ID,
  SECOND_EXTRA_NAME,
} from "./ExtraList.constants";
import { createExtraListPage } from "./ExtraList.page";
import { renderExtraListView } from "./renderExtraListView";
import { settleDeferred } from "./settleDeferred";

const TWO_EXTRAS = [
  DEFAULT_EXTRA,
  buildExtra({
    id: SECOND_EXTRA_ID,
    name: SECOND_EXTRA_NAME,
  }),
];

describe("ExtraCard actions across two cards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps the confirmation of another card when the first card settles", async () => {
    const firstRemoval =
      createDeferred<ExtraRemovalResult>();
    deleteOrDeactivateMock.mockReturnValueOnce(
      firstRemoval.promise
    );
    renderExtraListView({ extras: TWO_EXTRAS });
    const extraListPage = createExtraListPage();
    await extraListPage.clickRemove(DEFAULT_EXTRA.name);
    await extraListPage.clickRemove(DEFAULT_EXTRA.name);
    await extraListPage.clickRemove(SECOND_EXTRA_NAME);

    await settleDeferred(
      firstRemoval,
      DELETED_REMOVAL_RESULT
    );

    expect(
      extraListPage.queryRemovalConfirmMessage(
        SECOND_EXTRA_NAME
      )
    ).toBeInTheDocument();
  });

  it("keeps the second card loading and blocks a double submit when the first settles", async () => {
    const firstRemoval =
      createDeferred<ExtraRemovalResult>();
    const secondRemoval =
      createDeferred<ExtraRemovalResult>();
    deleteOrDeactivateMock
      .mockReturnValueOnce(firstRemoval.promise)
      .mockReturnValueOnce(secondRemoval.promise);
    renderExtraListView({ extras: TWO_EXTRAS });
    const extraListPage = createExtraListPage();
    await extraListPage.clickRemove(DEFAULT_EXTRA.name);
    await extraListPage.clickRemove(DEFAULT_EXTRA.name);
    await extraListPage.clickRemove(SECOND_EXTRA_NAME);
    await extraListPage.clickRemove(SECOND_EXTRA_NAME);

    await settleDeferred(
      firstRemoval,
      DELETED_REMOVAL_RESULT
    );

    expect(
      extraListPage.queryRemovingButton(SECOND_EXTRA_NAME)
    ).toBeDisabled();
    expect(deleteOrDeactivateMock).toHaveBeenCalledTimes(2);
    await settleDeferred(
      secondRemoval,
      DELETED_REMOVAL_RESULT
    );
  });
});
