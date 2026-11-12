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
import CategoryImage from "../CategoryImage";
import CategoryImageForm from "../CategoryImageForm";
import { getCategoryImage } from "../services/getCategoryImage";
import { IMAGE_CATEGORY_ID } from "./CategoryImage.constants";
import { SAVED_CATEGORY_IMAGE } from "./CategoryImageScreen.constants";

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

vi.mock("../services/getCategoryImage", () => ({
  getCategoryImage: vi.fn(),
}));

const renderEntry = () =>
  CategoryImage({ categoryId: IMAGE_CATEGORY_ID });

describe("CategoryImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
  });

  it("sends anyone who is not administration to the home without reading the category", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(renderEntry()).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
    expect(getCategoryImage).not.toHaveBeenCalled();
  });

  it("shows not found when the category does not exist", async () => {
    vi.mocked(getCategoryImage).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow();
    expect(notFound).toHaveBeenCalledOnce();
  });

  it("gives administration the image screen of the category", async () => {
    vi.mocked(getCategoryImage).mockResolvedValue(
      SAVED_CATEGORY_IMAGE
    );

    const element = await renderEntry();

    expect(element.type).toBe(CategoryImageForm);
    expect(element.props.image).toBe(SAVED_CATEGORY_IMAGE);
  });
});
