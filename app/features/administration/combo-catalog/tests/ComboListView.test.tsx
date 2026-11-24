import {
  deleteOrDeactivateMock,
  reactivateMock,
  refreshMock,
  showToastMock,
} from "./comboActions.harness";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CURRENCY_CODE, STATUS } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import {
  COMBO_AUDIENCE_EMPTY,
  COMBO_AUDIENCE_TITLE,
} from "../constants/ComboAudienceCopy.constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import { COMBO_STATUS } from "../constants/ComboStatus.constants";
import { COMBO_STATUS_LABEL } from "../constants/ComboStatusLabel.constants";
import ComboListView from "../ComboListView";
import type { ComboListViewProps } from "../models/ComboListViewProps.interface";
import {
  buildCombo,
  DEFAULT_COMBO,
  EXPECTED_ITEMS_SUMMARY,
  FAKE_COMBO_ID,
  NATIONAL_PRICE,
  SECOND_COMBO_ID,
  SECOND_COMBO_NAME,
} from "./Combo.constants";
import { createComboListPage } from "./ComboList.page";

const SUCCESS_MESSAGE = "removal result";

const renderComboListView = (
  overrides: Partial<ComboListViewProps> = {}
): void => {
  render(
    <ComboListView
      combos={[DEFAULT_COMBO]}
      fetchFailed={false}
      {...overrides}
    />
  );
};

describe("ComboListView", () => {
  beforeEach(() => {
    refreshMock.mockClear();
    showToastMock.mockClear();
    deleteOrDeactivateMock.mockReset();
    reactivateMock.mockReset();
  });

  it("titles the screen and shows both audience sections with their empty message", () => {
    renderComboListView({ combos: [] });
    const comboListPage = createComboListPage();

    expect(comboListPage.getTitle()).toBeInTheDocument();
    Object.values(COMBO_AUDIENCE).forEach((audience) => {
      expect(
        comboListPage.querySectionTitle(
          COMBO_AUDIENCE_TITLE[audience]
        )
      ).toBeInTheDocument();
      expect(
        comboListPage.queryEmptyMessage(
          COMBO_AUDIENCE_EMPTY[audience]
        )
      ).toBeInTheDocument();
    });
  });

  it("shows the combo with its equipment, price in its currency and status", () => {
    renderComboListView();
    const comboListPage = createComboListPage();

    expect(
      comboListPage.queryText(
        DEFAULT_COMBO.name,
        EXPECTED_ITEMS_SUMMARY
      )
    ).toBeInTheDocument();
    expect(
      comboListPage.queryText(
        DEFAULT_COMBO.name,
        formatMoney({
          amount: NATIONAL_PRICE,
          currency: CURRENCY_CODE.CRC,
        })
      )
    ).toBeInTheDocument();
    expect(
      comboListPage.queryText(
        DEFAULT_COMBO.name,
        COMBO_STATUS_LABEL[COMBO_STATUS.ACTIVE]
      )
    ).toBeInTheDocument();
    expect(
      comboListPage.queryEmptyMessage(
        COMBO_AUDIENCE_EMPTY[COMBO_AUDIENCE.NATIONAL]
      )
    ).not.toBeInTheDocument();
  });

  it("shows the fetch error and refreshes on retry", async () => {
    renderComboListView({ combos: [], fetchFailed: true });
    const comboListPage = createComboListPage();

    expect(
      comboListPage.getErrorMessage()
    ).toBeInTheDocument();
    await comboListPage.clickRetry();

    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("asks for confirmation and does not remove before it", async () => {
    renderComboListView();
    const comboListPage = createComboListPage();

    await comboListPage.clickRemove(DEFAULT_COMBO.name);

    expect(comboListPage.querySheet()).toBeInTheDocument();
    expect(deleteOrDeactivateMock).not.toHaveBeenCalled();
  });

  it("closes the sheet on cancel without removing", async () => {
    renderComboListView();
    const comboListPage = createComboListPage();

    await comboListPage.clickRemove(DEFAULT_COMBO.name);
    await comboListPage.cancelRemoval();

    expect(
      comboListPage.querySheet()
    ).not.toBeInTheDocument();
    expect(deleteOrDeactivateMock).not.toHaveBeenCalled();
  });

  it("removes the combo on confirm, shows what the server decided and refreshes", async () => {
    deleteOrDeactivateMock.mockResolvedValue({
      message: SUCCESS_MESSAGE,
      status: STATUS.SUCCESS,
    });
    renderComboListView();
    const comboListPage = createComboListPage();

    await comboListPage.clickRemove(DEFAULT_COMBO.name);
    await comboListPage.confirmRemoval();

    expect(deleteOrDeactivateMock).toHaveBeenCalledWith(
      FAKE_COMBO_ID
    );
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      SUCCESS_MESSAGE
    );
    expect(refreshMock).toHaveBeenCalledOnce();
    expect(
      comboListPage.querySheet()
    ).not.toBeInTheDocument();
  });

  it("shows a generic error toast when the removal throws", async () => {
    deleteOrDeactivateMock.mockRejectedValue(
      new Error("boom")
    );
    renderComboListView();
    const comboListPage = createComboListPage();

    await comboListPage.clickRemove(DEFAULT_COMBO.name);
    await comboListPage.confirmRemoval();

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      COMBO_CATALOG_COPY.REMOVAL_GENERIC_ERROR
    );
  });

  it("offers Reactivar instead of Eliminar on an inactive combo and reactivates it", async () => {
    reactivateMock.mockResolvedValue({
      message: COMBO_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST,
      status: STATUS.SUCCESS,
    });
    renderComboListView({
      combos: [
        buildCombo({
          id: SECOND_COMBO_ID,
          name: SECOND_COMBO_NAME,
          status: COMBO_STATUS.INACTIVE,
        }),
      ],
    });
    const comboListPage = createComboListPage();

    expect(
      comboListPage.queryButton(
        SECOND_COMBO_NAME,
        COMBO_CATALOG_COPY.REMOVE_BUTTON
      )
    ).not.toBeInTheDocument();
    await comboListPage.clickReactivate(SECOND_COMBO_NAME);

    expect(reactivateMock).toHaveBeenCalledWith(
      SECOND_COMBO_ID
    );
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      COMBO_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST
    );
  });

  it("still renders a combo with no equipment and no price", () => {
    renderComboListView({
      combos: [
        buildCombo({ items: [], packagePrice: null }),
      ],
    });
    const comboListPage = createComboListPage();

    expect(
      comboListPage.queryText(
        DEFAULT_COMBO.name,
        COMBO_CATALOG_COPY.NO_ITEMS
      )
    ).toBeInTheDocument();
    expect(
      comboListPage.queryText(
        DEFAULT_COMBO.name,
        COMBO_CATALOG_COPY.NO_PRICE
      )
    ).toBeInTheDocument();
  });
});
