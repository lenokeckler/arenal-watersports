import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import ExtraCompatibilityCategoryList from "../ExtraCompatibilityCategoryList";
import ExtraCompatibilityBoatsView from "../ExtraCompatibilityBoatsView";
import { getExtraCompatibilityCategories } from "../services/getExtraCompatibilityCategories";
import {
  COMPATIBILITY_CATEGORIES,
  COMPATIBILITY_EXTRA_ID,
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

vi.mock("../services/getExtraCompatibilityCategories");

const renderEntry = () =>
  ExtraCompatibilityCategoryList({
    extraId: COMPATIBILITY_EXTRA_ID,
  });

describe("ExtraCompatibilityCategoryList", () => {
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
    vi.mocked(
      getExtraCompatibilityCategories
    ).mockResolvedValue(COMPATIBILITY_CATEGORIES);
  });

  it("redirects a worker who is not an administrator home without reading the categories", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(renderEntry()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(
      getExtraCompatibilityCategories
    ).not.toHaveBeenCalled();
  });

  it("shows not found when the extra does not exist", async () => {
    vi.mocked(
      getExtraCompatibilityCategories
    ).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow(
      NOT_FOUND_ERROR_MESSAGE
    );
  });

  it("gives administration the categories of the extra", async () => {
    const element = await renderEntry();

    expect(
      getExtraCompatibilityCategories
    ).toHaveBeenCalledWith(COMPATIBILITY_EXTRA_ID);
    expect(element.type).toBe(ExtraCompatibilityBoatsView);
    expect(element.props).toEqual(COMPATIBILITY_CATEGORIES);
  });
});
