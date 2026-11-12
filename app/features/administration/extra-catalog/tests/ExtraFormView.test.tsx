import {
  createExtraMock,
  pushMock,
  updateExtraMock,
} from "./extraForm.harness";
import { waitFor } from "@testing-library/react";
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
  STRING,
} from "@/app/constants";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_FIELD_ID } from "../constants/ExtraFormFieldId.constants";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import { createDeferred } from "./createDeferred";
import {
  FAKE_EXTRA_ID,
  FAKE_EXTRA_NAME,
  FAKE_EXTRA_PRICE_USD_TEXT,
} from "./Extra.constants";
import {
  CREATE_FORM_PROPS,
  EDIT_FORM_PROPS,
  EDITED_EXTRA_NAME,
  EDITED_EXTRA_PRICE_USD_TEXT,
  EXTRA_FORM_SUCCESS_RESULT,
} from "./ExtraForm.constants";
import { renderExtraFormView } from "./renderExtraFormView";

describe("ExtraFormView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    createExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
    updateExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
  });

  it("renders the create form with an empty name and empty prices", () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);

    expect(page.getTitle()).toBeInTheDocument();
    expect(page.getNameField()).toHaveValue(STRING.Empty);
    expect(
      page.getPriceField(CURRENCY_CODE.USD)
    ).toHaveValue(STRING.Empty);
    expect(
      page.getPriceField(CURRENCY_CODE.CRC)
    ).toHaveValue(STRING.Empty);
    expect(page.getSubmitButton()).toBeEnabled();
  });

  it("renders the edit form with the name and the current prices of the extra, a missing price empty", () => {
    const page = renderExtraFormView(EDIT_FORM_PROPS);

    expect(page.getTitle()).toBeInTheDocument();
    expect(page.getNameField()).toHaveValue(
      FAKE_EXTRA_NAME
    );
    expect(
      page.getPriceField(CURRENCY_CODE.USD)
    ).toHaveValue(FAKE_EXTRA_PRICE_USD_TEXT);
    expect(
      page.getPriceField(CURRENCY_CODE.CRC)
    ).toHaveValue(STRING.Empty);
  });

  it("creates the extra with only a dollar price", async () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);
    await page.typeName(FAKE_EXTRA_NAME);
    await page.typePrice(
      CURRENCY_CODE.USD,
      FAKE_EXTRA_PRICE_USD_TEXT
    );

    await page.submit();

    expect(createExtraMock).toHaveBeenCalledWith({
      name: FAKE_EXTRA_NAME,
      priceUsd: FAKE_EXTRA_PRICE_USD_TEXT,
      priceCrc: STRING.Empty,
    });
  });

  it("shows the required error on the name field when it is submitted empty", async () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);

    await page.submit();

    expect(
      page.getNameError(
        EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR
      )
    ).toBeInTheDocument();
    expect(createExtraMock).not.toHaveBeenCalled();
  });

  it("describes the name field with the hint before any error", () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);

    expect(page.getNameDescribedByIds()).toStrictEqual([
      EXTRA_FORM_FIELD_ID.HINT,
    ]);
    expect(page.isNameFieldInvalid()).toBe(false);
  });

  it("marks the name field invalid and describes it with the error and the hint after a failed submit", async () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);

    await page.submit();

    expect(page.isNameFieldInvalid()).toBe(true);
    expect(page.getNameDescribedByIds()).toStrictEqual([
      `${EXTRA_FORM_FIELD_ID.NAME}${FIELD_ERROR_ID_SUFFIX}`,
      EXTRA_FORM_FIELD_ID.HINT,
    ]);
  });

  it("sends the id of the extra and the changed price when an edit is submitted", async () => {
    const page = renderExtraFormView(EDIT_FORM_PROPS);
    await page.typeName(EDITED_EXTRA_NAME);
    await page.typePrice(
      CURRENCY_CODE.USD,
      EDITED_EXTRA_PRICE_USD_TEXT
    );

    await page.submit();

    expect(updateExtraMock).toHaveBeenCalledWith({
      extraId: FAKE_EXTRA_ID,
      name: EDITED_EXTRA_NAME,
      priceUsd: EDITED_EXTRA_PRICE_USD_TEXT,
      priceCrc: STRING.Empty,
    });
    expect(createExtraMock).not.toHaveBeenCalled();
  });

  it("clears the error once the name changes", async () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);
    await page.submit();

    await page.typeName(FAKE_EXTRA_NAME);

    expect(
      page.getNameError(
        EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR
      )
    ).not.toBeInTheDocument();
  });

  it("shows the saving text and locks the form while the extra is saved", async () => {
    const deferred = createDeferred<ExtraMutationResult>();
    createExtraMock.mockReturnValue(deferred.promise);
    const page = renderExtraFormView(CREATE_FORM_PROPS);
    await page.typeName(FAKE_EXTRA_NAME);
    await page.typePrice(
      CURRENCY_CODE.USD,
      FAKE_EXTRA_PRICE_USD_TEXT
    );

    await page.submit();

    await waitFor(() =>
      expect(page.getSavingButton()).toBeDisabled()
    );
    expect(page.getNameField()).toBeDisabled();
    expect(
      page.getPriceField(CURRENCY_CODE.USD)
    ).toBeDisabled();
    expect(
      page.getPriceField(CURRENCY_CODE.CRC)
    ).toBeDisabled();
    expect(page.getCancelButton()).toBeDisabled();
    deferred.resolve(EXTRA_FORM_SUCCESS_RESULT);
    await waitFor(() =>
      expect(page.getNameField()).toBeEnabled()
    );
  });

  it("goes back to the extra list from the cancel button", async () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);

    await page.cancel();

    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.EXTRAS
    );
  });
});
