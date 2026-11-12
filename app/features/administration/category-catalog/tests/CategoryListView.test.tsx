import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import CategoryListView from "../CategoryListView";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

const SINGLE_PAGE = 1;

describe("CategoryListView", () => {
  it("ends with a link back to the home screen", () => {
    render(
      <CategoryListView
        categories={[DEFAULT_CATEGORY_LIST_ITEM]}
        currentPage={SINGLE_PAGE}
        fetchFailed={false}
        pageCount={SINGLE_PAGE}
        totalCount={SINGLE_PAGE}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: CATEGORY_CATALOG_COPY.BACK_TO_HOME,
      })
    ).toHaveAttribute("href", PATHS.HOME);
  });
});
