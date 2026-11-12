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
import { PATHS, STATUS, STRING } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_SUCCESS_TOAST } from "../constants/ExtraFormModeCopy.constants";
import {
  FAKE_EXTRA_ID,
  FAKE_EXTRA_NAME,
} from "./Extra.constants";
import {
  CREATE_FORM_PROPS,
  EDIT_FORM_PROPS,
  EDITED_EXTRA_NAME,
  EXTRA_FORM_SUCCESS_RESULT,
} from "./ExtraForm.constants";

const SAVE_CASES = [
  {
    props: CREATE_FORM_PROPS,
    values: { name: FAKE_EXTRA_NAME },
    input: { name: FAKE_EXTRA_NAME },
    action: createExtraMock,
    otherAction: updateExtraMock,
  },
  {
    props: EDIT_FORM_PROPS,
    values: { name: EDITED_EXTRA_NAME },
    input: {
      extraId: FAKE_EXTRA_ID,
      name: EDITED_EXTRA_NAME,
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

  it("reports the required name and calls no action", async () => {
    const setNameError = vi.fn();
    const { result } = renderExtraSubmit({
      values: { name: STRING.Empty },
      setNameError,
    });

    await submitExtraFormEvent(result);

    expect(setNameError).toHaveBeenCalledWith(
      EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR
    );
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
