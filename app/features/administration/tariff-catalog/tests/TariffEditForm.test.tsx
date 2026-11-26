import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { getTariffForEdit } from "../services/getTariffForEdit";
import TariffEditForm from "../TariffEditForm";
import TariffFormView from "../TariffFormView";
import { FAKE_CATEGORY_ID } from "./TariffCatalog.constants";
import {
  EXISTING_TARIFFS,
  NOT_FOUND_ERROR_MESSAGE,
  REDIRECT_ERROR_MESSAGE,
  throwNavigation,
} from "./TariffForm.constants";

const redirectMock = vi.hoisted(() => vi.fn());
const notFoundMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
  redirect: redirectMock,
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/getTariffForEdit");

const renderEntry = () =>
  TariffEditForm({ categoryId: FAKE_CATEGORY_ID });

describe("TariffEditForm", () => {
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
    vi.mocked(getTariffForEdit).mockResolvedValue(
      EXISTING_TARIFFS
    );
  });

  it("redirects a worker who is not an administrator home without reading the tariffs", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(renderEntry()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(getTariffForEdit).not.toHaveBeenCalled();
  });

  it("shows not found when the category does not exist", async () => {
    vi.mocked(getTariffForEdit).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow(
      NOT_FOUND_ERROR_MESSAGE
    );
  });

  it("gives administration the edit form of the category", async () => {
    const element = await renderEntry();

    expect(getTariffForEdit).toHaveBeenCalledWith(
      FAKE_CATEGORY_ID
    );
    expect(element.type).toBe(TariffFormView);
    expect(element.props).toEqual({
      tariff: EXISTING_TARIFFS,
    });
  });
});
