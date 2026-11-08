import { InlineText, Link } from "@/app/components";
import type { InventoryPaginationLinkProps } from "../models/InventoryPaginationLinkProps.interface";
import { resolveInventoryPaginationLinkClassName } from "../styles/InventoryPagination.styles";

const InventoryPaginationLink = ({
  href,
  isDisabled,
  label,
}: InventoryPaginationLinkProps): React.JSX.Element => {
  const className =
    resolveInventoryPaginationLinkClassName(isDisabled);

  if (isDisabled) {
    return (
      <InlineText className={className}>{label}</InlineText>
    );
  }

  return (
    <Link
      href={href}
      className={className}
    >
      {label}
    </Link>
  );
};

export default InventoryPaginationLink;
