export const isPersonalEmailNodeBefore = (
  first: Node,
  second: Node
): boolean =>
  Boolean(
    first.compareDocumentPosition(second) &
    Node.DOCUMENT_POSITION_FOLLOWING
  );
