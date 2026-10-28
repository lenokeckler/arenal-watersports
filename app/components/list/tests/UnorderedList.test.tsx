import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import UnorderedList from "../UnorderedList";
import { UNORDERED_LIST } from "../UnorderedList.constants";
import { ARIA_ROLE } from "@/app/constants";
import { createUnorderedListPage } from "./UnorderedList.page";
import {
  BULLET_LIST_CLASS,
  CHECKLIST_ITEM_CLASSES,
  CHECKLIST_ITEM_ID_PREFIX,
  CHECKLIST_ITEM_TEXTS,
  CHECKLIST_LIST_CLASSES,
  ID_ATTRIBUTE,
  LABEL_ATTRIBUTE,
  LIST_ARIA_LABEL,
  LIST_ID,
  LIST_LABEL_ID,
  OBJECT_ITEM_ID,
  OBJECT_ITEM_TEXT,
  PLAIN_ITEM_TEST_IDS,
  PLAIN_ITEM_TEXTS,
  PRESENTATION_ROLE,
  ROLE_ATTRIBUTE,
  STRING_ITEMS,
} from "./UnorderedList.constants";
import { renderUnorderedList } from "./renderUnorderedList";

const CHECKLIST_ITEMS = CHECKLIST_ITEM_TEXTS.map(
  (text) => ({
    id: `${CHECKLIST_ITEM_ID_PREFIX}-${text}`,
    text,
  })
);

describe("UnorderedList checklist variant", () => {
  it("renders the list without bullets and with the checklist layout", () => {
    render(
      <UnorderedList
        variant={UNORDERED_LIST.VARIANTS.CHECKLIST}
        items={CHECKLIST_ITEMS}
      />
    );
    const page = createUnorderedListPage();

    expect(page.getList()).toHaveClass(
      ...CHECKLIST_LIST_CLASSES
    );
    expect(page.getList()).not.toHaveClass(
      BULLET_LIST_CLASS
    );
  });

  it("renders every item with the checklist layout", () => {
    render(
      <UnorderedList
        variant={UNORDERED_LIST.VARIANTS.CHECKLIST}
        items={CHECKLIST_ITEMS}
      />
    );
    const page = createUnorderedListPage();

    expect(page.getItems()).toHaveLength(
      CHECKLIST_ITEMS.length
    );
    page.getItems().forEach((item) => {
      expect(item).toHaveClass(...CHECKLIST_ITEM_CLASSES);
    });
  });

  it("keeps the default variant unchanged", () => {
    render(
      <UnorderedList items={[...CHECKLIST_ITEM_TEXTS]} />
    );
    const page = createUnorderedListPage();

    expect(page.getList()).toHaveClass(BULLET_LIST_CLASS);
    expect(page.getList()).not.toHaveClass(
      ...CHECKLIST_LIST_CLASSES
    );
  });
});

describe("UnorderedList accessibility wiring", () => {
  it("puts id, role and aria-labelledby on the list element", () => {
    render(
      <UnorderedList
        id={LIST_ID}
        role={ARIA_ROLE.LIST}
        aria-labelledby={LIST_LABEL_ID}
        items={[...CHECKLIST_ITEM_TEXTS]}
      />
    );
    const list = createUnorderedListPage().getListElement();

    expect(list).toHaveAttribute(ID_ATTRIBUTE, LIST_ID);
    expect(list).toHaveAttribute(
      LABEL_ATTRIBUTE,
      LIST_LABEL_ID
    );
  });

  it("applies a custom role to the list element", () => {
    render(
      <UnorderedList
        role={PRESENTATION_ROLE}
        items={[...CHECKLIST_ITEM_TEXTS]}
      />
    );

    expect(
      createUnorderedListPage().getListElement()
    ).toHaveAttribute(ROLE_ATTRIBUTE, PRESENTATION_ROLE);
  });

  it("adds none of the attributes when the props are omitted", () => {
    render(
      <UnorderedList items={[...CHECKLIST_ITEM_TEXTS]} />
    );
    const list = createUnorderedListPage().getListElement();

    expect(list).not.toHaveAttribute(ID_ATTRIBUTE);
    expect(list).not.toHaveAttribute(LABEL_ATTRIBUTE);
    expect(list).not.toHaveAttribute(ROLE_ATTRIBUTE);
  });
});

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
