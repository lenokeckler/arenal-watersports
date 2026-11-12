import {
  changeExtraName,
  createExtraMock,
  pushMock,
  renderExtraViewModel,
  submitExtraViewModel,
  updateExtraMock,
} from "./extraForm.harness";
import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import {
  DEFAULT_EXTRA,
  FAKE_EXTRA_ID,
  FAKE_EXTRA_NAME,
} from "./Extra.constants";
import {
  EDITED_EXTRA_NAME,
  EXTRA_FORM_SUCCESS_RESULT,
  SEED_CASES,
} from "./ExtraForm.constants";

describe("useExtraFormViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    createExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
    updateExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
  });

  it.each(SEED_CASES)(
    "seeds the $props.mode form with an idle state",
    ({ props, values }) => {
      const { result } = renderExtraViewModel(props);

      expect(result.current.values).toStrictEqual(values);
      expect(result.current.errors).toStrictEqual({});
      expect(result.current.isSubmitting).toBe(false);
    }
  );

  it("shows the required name error on submit without calling the server", async () => {
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.CREATE,
    });

    await submitExtraViewModel(result);

    expect(result.current.errors.name).toBe(
      EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR
    );
    expect(createExtraMock).not.toHaveBeenCalled();
  });

  it("clears the name error when the name changes", async () => {
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.CREATE,
    });
    await submitExtraViewModel(result);

    changeExtraName(result, FAKE_EXTRA_NAME);

    expect(result.current.errors).toStrictEqual({});
    expect(result.current.values.name).toBe(
      FAKE_EXTRA_NAME
    );
  });

  it("creates the extra with the typed name", async () => {
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.CREATE,
    });
    changeExtraName(result, FAKE_EXTRA_NAME);

    await submitExtraViewModel(result);

    expect(createExtraMock).toHaveBeenCalledWith({
      name: FAKE_EXTRA_NAME,
    });
    expect(updateExtraMock).not.toHaveBeenCalled();
  });

  it("renames the extra with its id in edit mode", async () => {
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.EDIT,
      extra: DEFAULT_EXTRA,
    });
    changeExtraName(result, EDITED_EXTRA_NAME);

    await submitExtraViewModel(result);

    expect(updateExtraMock).toHaveBeenCalledWith({
      extraId: FAKE_EXTRA_ID,
      name: EDITED_EXTRA_NAME,
    });
    expect(createExtraMock).not.toHaveBeenCalled();
  });

  it("shows the duplicate name error on the name field", async () => {
    createExtraMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR,
    });
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.CREATE,
    });
    changeExtraName(result, FAKE_EXTRA_NAME);

    await submitExtraViewModel(result);

    expect(result.current.errors.name).toBe(
      EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR
    );
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("goes back to the extra list", () => {
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.CREATE,
    });

    act(() => {
      result.current.onBack();
    });

    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.EXTRAS
    );
  });
});
