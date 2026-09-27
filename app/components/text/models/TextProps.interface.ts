import { ReactNode } from "react";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  bold?: boolean;
}
