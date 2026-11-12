import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import CategoryBehavior from "../CategoryBehavior";
import CategoryBehaviorForm from "../CategoryBehaviorForm";
import { getCategoryBehavior } from "../services/getCategoryBehavior";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";

const FAKE_CATEGORY_ID = "fake-category-id";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/getCategoryBehavior", () => ({
  getCategoryBehavior: vi.fn(),
}));

describe("CategoryBehavior", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends anyone who is not administration to the home without reading the category", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(
      CategoryBehavior({ categoryId: FAKE_CATEGORY_ID })
    ).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
    expect(getCategoryBehavior).not.toHaveBeenCalled();
  });

  it("shows not found when the category does not exist", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(getCategoryBehavior).mockResolvedValue(null);

    await expect(
      CategoryBehavior({ categoryId: FAKE_CATEGORY_ID })
    ).rejects.toThrow();
    expect(notFound).toHaveBeenCalledOnce();
  });

  it("gives administration the behavior form of the category", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(getCategoryBehavior).mockResolvedValue(
      DEFAULT_CATEGORY_BEHAVIOR
    );

    const element = await CategoryBehavior({
      categoryId: FAKE_CATEGORY_ID,
    });

    expect(element.type).toBe(CategoryBehaviorForm);
    expect(element.props.behavior).toBe(
      DEFAULT_CATEGORY_BEHAVIOR
    );
  });
});
