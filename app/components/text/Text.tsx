import { TextProps } from "./models/TextProps.interface";
import { STRING } from "@/app/constants";
import { resolveTextClassName } from "./styles/Text.styles";

export const Text = ({
  children,
  className = STRING.Empty,
  bold = false,
  ...rest
}: TextProps) => (
  <p
    className={resolveTextClassName(bold, className)}
    {...rest}
  >
    {children}
  </p>
);

export default Text;
