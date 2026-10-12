import { describe, expect, it } from "vitest";
import { UNORDERED_LIST } from "@/app/constants";
import {
  LIST_ARIA_LABEL,
  OBJECT_ITEM_ID,
  OBJECT_ITEM_TEXT,
  PLAIN_ITEM_TEST_IDS,
  PLAIN_ITEM_TEXTS,
  ROLE_ATTRIBUTE,
  STRING_ITEMS,
} from "./UnorderedList.constants";
import { renderUnorderedList } from "./renderUnorderedList";

describe("UnorderedList plain variant", () => {
  const items = PLAIN_ITEM_TEST_IDS.map((id, index) => ({
    id,
    text: (
      <div data-testid={id}>{PLAIN_ITEM_TEXTS[index]}</div>
    ),
  }));

  it("exposes a list with the given accessible name", () => {
    const page = renderUnorderedList({
      ariaLabel: LIST_ARIA_LABEL,
      items,
      variant: UNORDERED_LIST.VARIANTS.PLAIN,
    });

    expect(
      page.getList(LIST_ARIA_LABEL)
    ).toBeInTheDocument();
  });

  it("renders each node item inside its own list item", () => {
    const page = renderUnorderedList({
      ariaLabel: LIST_ARIA_LABEL,
      items,
      variant: UNORDERED_LIST.VARIANTS.PLAIN,
    });

    const listItems = page.getItems();

    expect(listItems).toHaveLength(
      PLAIN_ITEM_TEST_IDS.length
    );
    PLAIN_ITEM_TEST_IDS.forEach((id, index) => {
      expect(listItems[index]).toContainElement(
        page.getItemByTestId(id)
      );
      expect(listItems[index]).toHaveTextContent(
        PLAIN_ITEM_TEXTS[index]
      );
    });
  });
});

describe("UnorderedList existing variants", () => {
  it("renders string items as list items with the default variant", () => {
    const page = renderUnorderedList({
      items: [...STRING_ITEMS],
    });

    expect(
      page.getItems().map((item) => item.textContent)
    ).toEqual([...STRING_ITEMS]);
  });

  it("does not set a list role on non-plain variants", () => {
    const page = renderUnorderedList({
      items: [...STRING_ITEMS],
      variant: UNORDERED_LIST.VARIANTS.DEFAULT,
    });

    expect(page.getListElement()).not.toHaveAttribute(
      ROLE_ATTRIBUTE
    );
  });

  it("renders object items by their text", () => {
    const page = renderUnorderedList({
      items: [
        { id: OBJECT_ITEM_ID, text: OBJECT_ITEM_TEXT },
      ],
    });

    expect(page.getItems()[0]).toHaveTextContent(
      OBJECT_ITEM_TEXT
    );
  });
});
