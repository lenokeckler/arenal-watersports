import { TitleVariant } from "../constants";

export interface TitleProps {
  id?: string;
  variant: TitleVariant;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}
