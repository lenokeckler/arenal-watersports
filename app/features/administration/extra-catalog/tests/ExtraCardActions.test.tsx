import {
  deleteOrDeactivateMock,
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
import { DEFAULT_EXTRA } from "./Extra.constants";
import { DELETED_REMOVAL_RESULT } from "./ExtraCardActions.constants";
import { buildExtra } from "./ExtraList.constants";
import { createExtraListPage } from "./ExtraList.page";
import { renderExtraListView } from "./renderExtraListView";

describe("ExtraCard actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each(Object.values(EXTRA_STATUS))(
    "keeps Editar on a %s extra",
    (status) => {
      renderExtraListView({
        extras: [buildExtra({ status })],
      });

      expect(
        createExtraListPage().getEditLink(
          DEFAULT_EXTRA.name
        )
      ).toBeInTheDocument();
    }
  );

  it("offers Eliminar and no Reactivar on an active extra", () => {
    renderExtraListView();
    const extraListPage = createExtraListPage();

    expect(
      extraListPage.queryRemoveButton(DEFAULT_EXTRA.name)
    ).toBeInTheDocument();
    expect(
      extraListPage.queryReactivateButton(
        DEFAULT_EXTRA.name
      )
    ).not.toBeInTheDocument();
  });

  it("offers Reactivar and no Eliminar on an inactive extra", () => {
    renderExtraListView({
      extras: [
        buildExtra({ status: EXTRA_STATUS.INACTIVE }),
      ],
    });
    const extraListPage = createExtraListPage();

    expect(
      extraListPage.queryReactivateButton(
        DEFAULT_EXTRA.name
      )
    ).toBeInTheDocument();
    expect(
      extraListPage.queryRemoveButton(DEFAULT_EXTRA.name)
    ).not.toBeInTheDocument();
  });

  it("switches the card to the inline confirmation that states the rule", async () => {
    renderExtraListView();
    const extraListPage = createExtraListPage();

    await extraListPage.clickRemove(DEFAULT_EXTRA.name);

    expect(
      extraListPage.queryRemovalConfirmMessage(
        DEFAULT_EXTRA.name
      )
    ).toBeInTheDocument();
    expect(
      extraListPage.queryCancelButton(DEFAULT_EXTRA.name)
    ).toBeInTheDocument();
    expect(
      extraListPage.getEditLink(DEFAULT_EXTRA.name)
    ).not.toBeInTheDocument();
  });

  it("goes back to the plain card when Cancelar is tapped", async () => {
    renderExtraListView();
    const extraListPage = createExtraListPage();
    await extraListPage.clickRemove(DEFAULT_EXTRA.name);

    await extraListPage.clickCancel(DEFAULT_EXTRA.name);

    expect(
      extraListPage.queryRemovalConfirmMessage(
        DEFAULT_EXTRA.name
      )
    ).not.toBeInTheDocument();
    expect(
      extraListPage.getEditLink(DEFAULT_EXTRA.name)
    ).toBeInTheDocument();
    expect(deleteOrDeactivateMock).not.toHaveBeenCalled();
  });

  it("runs the delete-or-deactivate action only after confirming", async () => {
    deleteOrDeactivateMock.mockResolvedValue(
      DELETED_REMOVAL_RESULT
    );
    renderExtraListView();
    const extraListPage = createExtraListPage();
    await extraListPage.clickRemove(DEFAULT_EXTRA.name);
    expect(deleteOrDeactivateMock).not.toHaveBeenCalled();

    await extraListPage.clickRemove(DEFAULT_EXTRA.name);

    expect(deleteOrDeactivateMock).toHaveBeenCalledWith(
      DEFAULT_EXTRA.id
    );
    expect(refreshMock).toHaveBeenCalledOnce();
  });
});
