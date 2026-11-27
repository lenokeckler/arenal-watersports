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
import CategoryConfigure from "../CategoryConfigure";
import CategoryConfigureView from "../CategoryConfigureView";
import { getCategoryConfiguration } from "../services/getCategoryConfiguration";
import { DEFAULT_CATEGORY_CONFIGURATION } from "./CategoryConfiguration.constants";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";

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

vi.mock("../services/getCategoryConfiguration", () => ({
  getCategoryConfiguration: vi.fn(),
}));

describe("CategoryConfigure", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends anyone who is not administration to the home without reading the category", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(
      CategoryConfigure({ categoryId: FAKE_CATEGORY_ID })
    ).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
    expect(getCategoryConfiguration).not.toHaveBeenCalled();
  });

  it("shows not found when the category does not exist", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(getCategoryConfiguration).mockResolvedValue(
      null
    );

    await expect(
      CategoryConfigure({ categoryId: FAKE_CATEGORY_ID })
    ).rejects.toThrow();
    expect(notFound).toHaveBeenCalledOnce();
  });

  it("gives administration the configure view of the category", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(getCategoryConfiguration).mockResolvedValue(
      DEFAULT_CATEGORY_CONFIGURATION
    );

    const element = await CategoryConfigure({
      categoryId: FAKE_CATEGORY_ID,
    });

    expect(element.type).toBe(CategoryConfigureView);
    expect(element.props.configuration).toBe(
      DEFAULT_CATEGORY_CONFIGURATION
    );
  });
});
