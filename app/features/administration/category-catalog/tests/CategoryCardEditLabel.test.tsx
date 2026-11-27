import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryCardEditLabel from "../components/CategoryCardEditLabel";
import { createCategoryCardPage } from "./CategoryCard.page";

describe("CategoryCardEditLabel", () => {
  it("shows the Editar text", () => {
    render(<CategoryCardEditLabel />);
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getEditLabel()
    ).toBeInTheDocument();
  });

  it("is plain text, not a button", () => {
    render(<CategoryCardEditLabel />);
    const categoryCardPage = createCategoryCardPage();

    expect(categoryCardPage.getButtons()).toHaveLength(0);
  });
});
