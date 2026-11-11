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
import ExtraCreateForm from "../ExtraCreateForm";
import ExtraFormView from "../ExtraFormView";
import {
  REDIRECT_ERROR_MESSAGE,
  throwNavigation,
} from "./ExtraList.constants";

const redirectMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

describe("ExtraCreateForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirectMock.mockImplementation(
      throwNavigation(REDIRECT_ERROR_MESSAGE)
    );
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
  });

  it("redirects a worker who is not an administrator home", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(ExtraCreateForm()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("gives administration the create form", async () => {
    const element = await ExtraCreateForm();

    expect(element.type).toBe(ExtraFormView);
    expect(element.props).toEqual({
      mode: EXTRA_FORM_MODE.CREATE,
    });
  });
});
