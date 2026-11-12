import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { submitWorkerRegistration } from "../actions/submitWorkerRegistration";
import WorkerRegistration from "../WorkerRegistration";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
  registerWorkerAsSignedIn: vi.fn(),
}));

describe("WorkerRegistration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends anyone who is not administration to the home", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(WorkerRegistration()).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("gives administration the form wired to the registration action", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );

    const element = await WorkerRegistration();

    expect(redirect).not.toHaveBeenCalled();
    expect(element.props.action).toBe(
      submitWorkerRegistration
    );
  });
});
