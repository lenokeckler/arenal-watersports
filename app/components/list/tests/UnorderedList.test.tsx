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
  LIST_ID,
  LIST_LABEL_ID,
  PRESENTATION_ROLE,
  ROLE_ATTRIBUTE,
} from "./UnorderedList.constants";

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
