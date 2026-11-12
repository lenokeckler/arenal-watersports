import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import ExtraEditForm from "../ExtraEditForm";
import ExtraFormView from "../ExtraFormView";
import { getExtra } from "../services/getExtra";
import {
  DEFAULT_EXTRA,
  FAKE_EXTRA_ID,
} from "./Extra.constants";
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

vi.mock("../services/getExtra");

const renderEntry = () =>
  ExtraEditForm({ extraId: FAKE_EXTRA_ID });

describe("ExtraEditForm", () => {
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
    vi.mocked(getExtra).mockResolvedValue(DEFAULT_EXTRA);
  });

  it("redirects a worker who is not an administrator home without reading the extra", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(renderEntry()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(getExtra).not.toHaveBeenCalled();
  });

  it("shows not found when the extra does not exist", async () => {
    vi.mocked(getExtra).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow(
      NOT_FOUND_ERROR_MESSAGE
    );
  });

  it("gives administration the edit form of the extra", async () => {
    const element = await renderEntry();

    expect(getExtra).toHaveBeenCalledWith(FAKE_EXTRA_ID);
    expect(element.type).toBe(ExtraFormView);
    expect(element.props).toEqual({
      mode: EXTRA_FORM_MODE.EDIT,
      extra: DEFAULT_EXTRA,
    });
  });
});
