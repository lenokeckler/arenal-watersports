import { STRING } from "@/app/constants";
import { LabelProps } from "./models/LabelProps.interface";
import { resolveLabelClassName } from "./styles/Label.styles";

export const Label = ({
  children,
  className = STRING.Empty,
  bold = false,
  ...rest
}: LabelProps) => (
  <label
    className={resolveLabelClassName(bold, className)}
    {...rest}
  >
    {children}
  </label>
);

export default Label;
