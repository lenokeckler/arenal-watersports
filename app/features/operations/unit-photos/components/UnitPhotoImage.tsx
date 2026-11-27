import Image from "@/app/components/image/Image";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import type { UnitPhotoImageProps } from "../models/UnitPhotoImageProps.interface";
import type { JSX } from "react";

const UnitPhotoImage = ({
  angleLabel,
  className,
  sizes,
  url,
}: UnitPhotoImageProps): JSX.Element => (
  <Image
    aria-hidden={false}
    alt={`${UNIT_PHOTOS_COPY.ALT_PREFIX}${angleLabel}`}
    className={className}
    fill
    priority={false}
    sizes={sizes}
    src={url}
    unoptimized
  />
);

export default UnitPhotoImage;
