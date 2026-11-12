import {
  createExtraMock,
  pushMock,
  refreshMock,
  renderExtraSubmit,
  showToastMock,
  submitExtraFormEvent,
  updateExtraMock,
} from "./extraForm.harness";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, STATUS } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_SUCCESS_TOAST } from "../constants/ExtraFormModeCopy.constants";
import { FAKE_EXTRA_ID } from "./Extra.constants";
import {
  CREATE_FORM_PROPS,
  EDIT_FORM_PROPS,
  EDITED_EXTRA_NAME,
  EDITED_EXTRA_PRICE_USD_TEXT,
  EMPTY_EXTRA_FORM_VALUES,
  EXTRA_FORM_SUCCESS_RESULT,
  VALID_EXTRA_FORM_VALUES,
} from "./ExtraForm.constants";

const EDITED_VALUES = {
  ...VALID_EXTRA_FORM_VALUES,
  name: EDITED_EXTRA_NAME,
  priceUsd: EDITED_EXTRA_PRICE_USD_TEXT,
};

const SAVE_CASES = [
  {
    props: CREATE_FORM_PROPS,
    values: VALID_EXTRA_FORM_VALUES,
    input: VALID_EXTRA_FORM_VALUES,
    action: createExtraMock,
    otherAction: updateExtraMock,
  },
  {
    props: EDIT_FORM_PROPS,
    values: EDITED_VALUES,
    input: {
      extraId: FAKE_EXTRA_ID,
      ...EDITED_VALUES,
    },
    action: updateExtraMock,
    otherAction: createExtraMock,
  },
];

describe("useExtraFormSubmit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    createExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
    updateExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
  });

  it("reports the required name and prices and calls no action", async () => {
    const showErrors = vi.fn();
    const { result } = renderExtraSubmit({
      values: EMPTY_EXTRA_FORM_VALUES,
      showErrors,
    });

    await submitExtraFormEvent(result);

    expect(showErrors).toHaveBeenCalledWith({
      name: EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR,
      prices: EXTRA_CATALOG_COPY.PRICES_REQUIRED_ERROR,
    });
    expect(createExtraMock).not.toHaveBeenCalled();
    expect(updateExtraMock).not.toHaveBeenCalled();
    expect(showToastMock).not.toHaveBeenCalled();
  });

  it.each(SAVE_CASES)(
    "saves in $props.mode mode through its own action, toasts and goes back to the list",
    async ({
      props,
      values,
      input,
      action,
      otherAction,
    }) => {
      const { result } = renderExtraSubmit(
        { values },
        props
      );

      await submitExtraFormEvent(result);

      expect(action).toHaveBeenCalledWith(input);
      expect(otherAction).not.toHaveBeenCalled();
      expect(showToastMock).toHaveBeenCalledWith(
        STATUS.SUCCESS,
        EXTRA_FORM_SUCCESS_TOAST[props.mode]
      );
      expect(pushMock).toHaveBeenCalledWith(
        PATHS.ADMINISTRATION.EXTRAS
      );
      expect(refreshMock).toHaveBeenCalledOnce();
    }
  );
});
