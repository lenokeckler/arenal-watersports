import { ImageProps } from "next/image";
import { FC, SVGProps } from "react";

export type SVGComponent = FC<SVGProps<SVGSVGElement>>;

export interface IconProps extends Omit<ImageProps, "src"> {
  src: string | SVGComponent;
  alt: string;
  size?: number;
  className?: string;
}
