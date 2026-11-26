import {
  pushMock,
  refreshMock,
  saveTariffsMock,
  showToastMock,
} from "./tariffForm.harness";
import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CURRENCY_CODE,
  PATHS,
  STATUS,
} from "@/app/constants";
import { TARIFF_FORM_COPY } from "../constants/TariffFormCopy.constants";
import { TARIFF_FORM_TYPE_ORDER } from "../constants/TariffFormTypeOrder.constants";
import { TARIFF_PRICE_ERROR_COPY } from "../constants/TariffPriceErrorCopy.constants";
import { TARIFF_PRICE_FIELDS } from "../constants/TariffPriceField.constants";
import { TARIFF_TYPE } from "../constants/TariffType.constants";
import type { SaveTariffsResult } from "../models/SaveTariffsResult.interface";
import type { TariffFormViewProps } from "../models/TariffFormViewProps.interface";
import TariffFormView from "../TariffFormView";
import { FAKE_CATEGORY_NAME } from "./TariffCatalog.constants";
import {
  EDIT_FORM_PROPS,
  EMPTY_FORM_PROPS,
  NON_NUMERIC_PRICE_TEXT,
  RENTAL_CRC_TEXT,
  RENTAL_USD_TEXT,
  SAVE_FAILURE_RESULT,
  SAVE_SUCCESS_RESULT,
  SERVER_ERROR_MESSAGE,
} from "./TariffForm.constants";
import { createTariffFormPage } from "./TariffForm.page";
import { createDeferred } from "./createDeferred";
import { settleDeferred } from "./settleDeferred";

const NON_NUMERIC_USD_ERROR =
  TARIFF_PRICE_ERROR_COPY[CURRENCY_CODE.USD].format;

const renderTariffFormView = (
  props: TariffFormViewProps = EDIT_FORM_PROPS
) => {
  render(<TariffFormView {...props} />);
  return createTariffFormPage();
};

describe("TariffFormView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    saveTariffsMock.mockResolvedValue(SAVE_SUCCESS_RESULT);
  });

  it("titles the screen with the category and shows the change hint, both sections and their saved prices", () => {
    const page = renderTariffFormView();

    expect(
      page.queryHeading(FAKE_CATEGORY_NAME)
    ).toBeInTheDocument();
    expect(
      page.queryText(TARIFF_FORM_COPY.CHANGE_HINT)
    ).toBeInTheDocument();
    TARIFF_FORM_TYPE_ORDER.forEach((type) => {
      expect(page.querySectionUnits(type)).toHaveLength(
        TARIFF_PRICE_FIELDS.length
      );
    });
    expect(
      page.getUsdField(TARIFF_TYPE.RENTAL)
    ).toHaveValue(RENTAL_USD_TEXT);
    expect(
      page.getCrcField(TARIFF_TYPE.RENTAL)
    ).toHaveValue(RENTAL_CRC_TEXT);
  });

  it("shows a field error only after the first submit and does not save", async () => {
    const page = renderTariffFormView();
    await page.typeUsd(
      TARIFF_TYPE.RENTAL,
      NON_NUMERIC_PRICE_TEXT
    );

    expect(
      page.queryText(NON_NUMERIC_USD_ERROR)
    ).toBeNull();
    await page.submit();

    expect(
      page.queryText(NON_NUMERIC_USD_ERROR)
    ).toBeInTheDocument();
    expect(saveTariffsMock).not.toHaveBeenCalled();
  });

  it("shows the form-level error in the banner when no price is given", async () => {
    const page = renderTariffFormView(EMPTY_FORM_PROPS);

    await page.submit();

    expect(page.getBanner()).toHaveTextContent(
      TARIFF_FORM_COPY.NO_PRICE_ERROR
    );
  });

  it("saves, toasts, goes back to the list and refreshes", async () => {
    const page = renderTariffFormView();

    await page.submit();

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      TARIFF_FORM_COPY.SAVE_SUCCESS_TOAST
    );
    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.TARIFFS
    );
    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("keeps the typed data and shows the message when the save fails", async () => {
    saveTariffsMock.mockResolvedValue(SAVE_FAILURE_RESULT);
    const page = renderTariffFormView();
    await page.typeCrc(TARIFF_TYPE.TOUR, RENTAL_CRC_TEXT);

    await page.submit();

    expect(page.getBanner()).toHaveTextContent(
      SERVER_ERROR_MESSAGE
    );
    expect(page.getCrcField(TARIFF_TYPE.TOUR)).toHaveValue(
      RENTAL_CRC_TEXT
    );
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("disables the form and shows the saving text while saving", async () => {
    const deferred = createDeferred<SaveTariffsResult>();
    saveTariffsMock.mockReturnValue(deferred.promise);
    const page = renderTariffFormView();

    await page.submit();

    expect(page.querySavingButton()).toBeInTheDocument();
    expect(page.getBackButton()).toBeDisabled();
    expect(
      page.getUsdField(TARIFF_TYPE.RENTAL)
    ).toBeDisabled();
    await settleDeferred(deferred, SAVE_SUCCESS_RESULT);
  });

  it("goes back to the list without saving", async () => {
    const page = renderTariffFormView();

    await page.clickBack();

    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.TARIFFS
    );
    expect(saveTariffsMock).not.toHaveBeenCalled();
  });
});
