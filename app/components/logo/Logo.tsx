"use client";
import Link from "../link/Link";
import Image from "../image/Image";
import { LogoProps } from "./LogoProps.interface";
import { BOOLEAN, PATHS, LOGO } from "@/app/constants";
import {
  LOGO_IMAGE_CLASS,
  LOGO_IMAGE_WRAPPER_CLASS,
  LOGO_LINK_CLASS,
  LOGO_NAME_CLASS,
} from "./styles/Logo.styles";

const Logo = ({ src, alt, onClick }: LogoProps) => (
  <Link
    href={PATHS.HOME}
    className={LOGO_LINK_CLASS}
    onClick={onClick}
  >
    <div className={LOGO_IMAGE_WRAPPER_CLASS}>
      <Image
        src={src}
        alt={alt}
        fill
        aria-hidden={BOOLEAN.FALSE.value}
        className={LOGO_IMAGE_CLASS}
      />
    </div>
    <span className={LOGO_NAME_CLASS}>
      {LOGO.mediXenter}
    </span>
  </Link>
);
export default Logo;
