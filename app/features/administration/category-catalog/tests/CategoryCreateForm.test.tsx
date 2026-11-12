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
import CategoryCreateForm from "../CategoryCreateForm";
import CategoryCreateFormView from "../CategoryCreateFormView";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

describe("CategoryCreateForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends anyone who is not administration to the home", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(CategoryCreateForm()).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("renders the create form view for administration", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );

    const element = await CategoryCreateForm();

    expect(redirect).not.toHaveBeenCalled();
    expect(element.type).toBe(CategoryCreateFormView);
  });
});
