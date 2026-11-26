import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import ComboCreateForm from "../ComboCreateForm";
import ComboFormView from "../ComboFormView";
import { listComboCategoryOptions } from "../services/listComboCategoryOptions";
import {
  CATEGORY_OPTIONS,
  REDIRECT_ERROR_MESSAGE,
  throwNavigation,
} from "./ComboForm.constants";

const redirectMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/listComboCategoryOptions");

describe("ComboCreateForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirectMock.mockImplementation(
      throwNavigation(REDIRECT_ERROR_MESSAGE)
    );
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(listComboCategoryOptions).mockResolvedValue(
      CATEGORY_OPTIONS
    );
  });

  it("redirects a worker who is not an administrator home without reading categories", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(ComboCreateForm()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(listComboCategoryOptions).not.toHaveBeenCalled();
  });

  it("gives administration the create form with the category options", async () => {
    const element = await ComboCreateForm();

    expect(element.type).toBe(ComboFormView);
    expect(element.props).toEqual({
      categoryOptions: CATEGORY_OPTIONS,
    });
  });
});
