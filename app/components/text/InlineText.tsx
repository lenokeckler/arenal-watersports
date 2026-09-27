import { STRING } from "@/app/constants";
import { TextProps } from "./models/TextProps.interface";
import { resolveInlineTextClassName } from "./styles/InlineText.styles";

export const InlineText = ({
  children,
  className = STRING.Empty,
  bold = false,
  ...rest
}: TextProps) => (
  <span
    className={resolveInlineTextClassName(bold, className)}
    {...rest}
  >
    {children}
  </span>
);

export default InlineText;
