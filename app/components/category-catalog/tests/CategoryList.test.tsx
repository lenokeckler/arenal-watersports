import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import CategoryList from "../CategoryList";
import { listCategories } from "../services/listCategories";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const REDIRECT_ERROR_MESSAGE = "NEXT_REDIRECT";

const redirectMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/listCategories", () => ({
  listCategories: vi.fn(),
}));

describe("CategoryList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirectMock.mockImplementation(() => {
      throw new Error(REDIRECT_ERROR_MESSAGE);
    });
  });

  it("redirects a worker who is not an administrator home without reading any category", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(CategoryList()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(listCategories).not.toHaveBeenCalled();
  });

  it("passes the categories to the view for an administrator", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(listCategories).mockResolvedValue([
      DEFAULT_CATEGORY_LIST_ITEM,
    ]);

    const element = await CategoryList();

    expect(redirectMock).not.toHaveBeenCalled();
    expect(element.props).toEqual({
      categories: [DEFAULT_CATEGORY_LIST_ITEM],
      fetchFailed: false,
    });
  });

  it("flags a failed read for an administrator when the categories cannot be loaded", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(listCategories).mockRejectedValue(
      new Error("read failed")
    );

    const element = await CategoryList();

    expect(element.props.fetchFailed).toBe(true);
    expect(element.props.categories).toEqual([]);
  });
});
