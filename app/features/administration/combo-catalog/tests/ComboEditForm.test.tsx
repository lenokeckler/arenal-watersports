import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import ComboEditForm from "../ComboEditForm";
import ComboFormView from "../ComboFormView";
import { getComboForEdit } from "../services/getComboForEdit";
import { listComboCategoryOptions } from "../services/listComboCategoryOptions";
import { FAKE_COMBO_ID } from "./Combo.constants";
import {
  CATEGORY_OPTIONS,
  DEFAULT_COMBO_FOR_EDIT,
  FAKE_CATEGORY_ID,
  NOT_FOUND_ERROR_MESSAGE,
  REDIRECT_ERROR_MESSAGE,
  throwNavigation,
} from "./ComboForm.constants";

const redirectMock = vi.hoisted(() => vi.fn());
const notFoundMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
  redirect: redirectMock,
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/getComboForEdit");
vi.mock("../services/listComboCategoryOptions");

const renderEntry = () =>
  ComboEditForm({ comboId: FAKE_COMBO_ID });

describe("ComboEditForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirectMock.mockImplementation(
      throwNavigation(REDIRECT_ERROR_MESSAGE)
    );
    notFoundMock.mockImplementation(
      throwNavigation(NOT_FOUND_ERROR_MESSAGE)
    );
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(getComboForEdit).mockResolvedValue(
      DEFAULT_COMBO_FOR_EDIT
    );
    vi.mocked(listComboCategoryOptions).mockResolvedValue(
      CATEGORY_OPTIONS
    );
  });

  it("redirects a worker who is not an administrator home without reading the combo", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(renderEntry()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(getComboForEdit).not.toHaveBeenCalled();
  });

  it("shows not found when the combo does not exist", async () => {
    vi.mocked(getComboForEdit).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow(
      NOT_FOUND_ERROR_MESSAGE
    );

    expect(listComboCategoryOptions).not.toHaveBeenCalled();
  });

  it("lists the categories keeping the ones the combo already uses", async () => {
    await renderEntry();

    expect(getComboForEdit).toHaveBeenCalledWith(
      FAKE_COMBO_ID
    );
    expect(listComboCategoryOptions).toHaveBeenCalledWith([
      FAKE_CATEGORY_ID,
    ]);
  });

  it("gives administration the edit form of the combo", async () => {
    const element = await renderEntry();

    expect(element.type).toBe(ComboFormView);
    expect(element.props).toEqual({
      categoryOptions: CATEGORY_OPTIONS,
      combo: DEFAULT_COMBO_FOR_EDIT,
    });
  });
});
