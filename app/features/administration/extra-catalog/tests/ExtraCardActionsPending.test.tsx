import {
  deleteOrDeactivateMock,
  reactivateMock,
  refreshMock,
} from "./extraCardActions.harness";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import type { ExtraRemovalResult } from "../models/ExtraRemovalResult.type";
import { createDeferred } from "./createDeferred";
import { settleDeferred } from "./settleDeferred";
import { DEFAULT_EXTRA } from "./Extra.constants";
import {
  DELETED_REMOVAL_RESULT,
  FAILED_REMOVAL_RESULT,
  SUCCESSFUL_REACTIVATION_RESULT,
} from "./ExtraCardActions.constants";
import { buildExtra } from "./ExtraList.constants";
import { createExtraListPage } from "./ExtraList.page";
import { renderExtraListView } from "./renderExtraListView";

describe("ExtraCard actions while a mutation is pending", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("disables Cancelar and shows Eliminando while the removal runs", async () => {
    const removal = createDeferred<ExtraRemovalResult>();
    deleteOrDeactivateMock.mockReturnValue(removal.promise);
    renderExtraListView();
    const extraListPage = createExtraListPage();
    await extraListPage.clickRemove(DEFAULT_EXTRA.name);

    await extraListPage.clickRemove(DEFAULT_EXTRA.name);

    expect(
      extraListPage.queryCancelButton(DEFAULT_EXTRA.name)
    ).toBeDisabled();
    expect(
      extraListPage.queryRemovingButton(DEFAULT_EXTRA.name)
    ).toBeDisabled();
    await settleDeferred(removal, DELETED_REMOVAL_RESULT);
  });

  it("returns to the plain card and refreshes after a failed removal", async () => {
    deleteOrDeactivateMock.mockResolvedValue(
      FAILED_REMOVAL_RESULT
    );
    renderExtraListView();
    const extraListPage = createExtraListPage();
    await extraListPage.clickRemove(DEFAULT_EXTRA.name);

    await extraListPage.clickRemove(DEFAULT_EXTRA.name);

    expect(
      extraListPage.queryRemovalConfirmMessage(
        DEFAULT_EXTRA.name
      )
    ).not.toBeInTheDocument();
    expect(
      extraListPage.getEditLink(DEFAULT_EXTRA.name)
    ).toBeInTheDocument();
    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("shows Actualizando while a reactivation runs", async () => {
    const reactivation =
      createDeferred<ExtraMutationResult>();
    reactivateMock.mockReturnValue(reactivation.promise);
    renderExtraListView({
      extras: [
        buildExtra({ status: EXTRA_STATUS.INACTIVE }),
      ],
    });
    const extraListPage = createExtraListPage();

    await extraListPage.clickReactivate(DEFAULT_EXTRA.name);

    expect(
      extraListPage.queryReactivatingButton(
        DEFAULT_EXTRA.name
      )
    ).toBeDisabled();
    await settleDeferred(
      reactivation,
      SUCCESSFUL_REACTIVATION_RESULT
    );
  });
});
