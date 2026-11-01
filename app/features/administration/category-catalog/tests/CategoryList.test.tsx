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
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
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

    await expect(
      CategoryList({ pageParam: undefined })
    ).rejects.toThrow(REDIRECT_ERROR_MESSAGE);

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(listCategories).not.toHaveBeenCalled();
  });

  it("passes the categories to the view for an administrator", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(listCategories).mockResolvedValue({
      categories: [DEFAULT_CATEGORY_LIST_ITEM],
      pageCount: 1,
    });

    const element = await CategoryList({
      pageParam: undefined,
    });

    expect(redirectMock).not.toHaveBeenCalled();
    expect(element.props).toEqual({
      categories: [DEFAULT_CATEGORY_LIST_ITEM],
      currentPage: 1,
      fetchFailed: false,
      pageCount: 1,
    });
  });

  it("flags a failed read for an administrator when the categories cannot be loaded", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(listCategories).mockRejectedValue(
      new Error("read failed")
    );

    const element = await CategoryList({
      pageParam: undefined,
    });

    expect(element.props.fetchFailed).toBe(true);
    expect(element.props.categories).toEqual([]);
  });

  it("reads the page named in the address", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(listCategories).mockResolvedValue({
      categories: [DEFAULT_CATEGORY_LIST_ITEM],
      pageCount: 3,
    });

    const element = await CategoryList({ pageParam: "2" });

    expect(listCategories).toHaveBeenCalledWith(2);
    expect(element.props.currentPage).toBe(2);
  });

  it("sends the worker to the last page when the requested page is past the end", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(listCategories).mockResolvedValue({
      categories: [],
      pageCount: 2,
    });

    await expect(
      CategoryList({ pageParam: "9" })
    ).rejects.toThrow(REDIRECT_ERROR_MESSAGE);

    expect(redirectMock).toHaveBeenCalledWith(
      resolveListPageHref(
        PATHS.ADMINISTRATION.CATEGORIES,
        2
      )
    );
  });
});
