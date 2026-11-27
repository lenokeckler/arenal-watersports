import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import ExtraCompatibilityUnitsForm from "../ExtraCompatibilityUnitsForm";
import ExtraCompatibilityUnitsFormView from "../ExtraCompatibilityUnitsFormView";
import { getExtraCompatibilityUnits } from "../services/getExtraCompatibilityUnits";
import {
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_EXTRA_ID,
  COMPATIBILITY_UNITS,
} from "./ExtraCompatibility.constants";
import {
  NOT_FOUND_ERROR_MESSAGE,
  REDIRECT_ERROR_MESSAGE,
  throwNavigation,
} from "./ExtraList.constants";

const redirectMock = vi.hoisted(() => vi.fn());
const notFoundMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
  notFound: notFoundMock,
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/getExtraCompatibilityUnits");

const renderEntry = () =>
  ExtraCompatibilityUnitsForm({
    categoryId: COMPATIBILITY_CATEGORY_ID,
    extraId: COMPATIBILITY_EXTRA_ID,
  });

describe("ExtraCompatibilityUnitsForm", () => {
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
    vi.mocked(getExtraCompatibilityUnits).mockResolvedValue(
      COMPATIBILITY_UNITS
    );
  });

  it("redirects a worker who is not an administrator home without reading the units", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(renderEntry()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(
      getExtraCompatibilityUnits
    ).not.toHaveBeenCalled();
  });

  it("shows not found when the extra or the category does not exist", async () => {
    vi.mocked(getExtraCompatibilityUnits).mockResolvedValue(
      null
    );

    await expect(renderEntry()).rejects.toThrow(
      NOT_FOUND_ERROR_MESSAGE
    );
  });

  it("gives administration the units of the category for the extra", async () => {
    const element = await renderEntry();

    expect(getExtraCompatibilityUnits).toHaveBeenCalledWith(
      COMPATIBILITY_EXTRA_ID,
      COMPATIBILITY_CATEGORY_ID
    );
    expect(element.type).toBe(
      ExtraCompatibilityUnitsFormView
    );
    expect(element.props).toEqual(COMPATIBILITY_UNITS);
  });
});
