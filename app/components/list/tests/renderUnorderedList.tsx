import { render } from "@testing-library/react";
import UnorderedList from "../UnorderedList";
import type { UnorderedListProps } from "../UnorderedListProps.interface";
import { createUnorderedListPage } from "./UnorderedList.page";

export const renderUnorderedList = (
  props: UnorderedListProps = {}
) => {
  const { container } = render(
    <UnorderedList {...props} />
  );

  return createUnorderedListPage(container);
};
