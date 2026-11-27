import Link from "@/app/components/link/Link";
import { PATHS } from "@/app/constants";
import type { UnitPhotoListCardProps } from "../models/UnitPhotoListCardProps.interface";
import { resolveUnitPhotoListCardClass } from "../styles/UnitPhotoList.styles";
import UnitPhotoListBody from "./UnitPhotoListBody";
import UnitPhotoListCover from "./UnitPhotoListCover";
import type { JSX } from "react";

const UnitPhotoListCard = ({
  item,
  size,
}: UnitPhotoListCardProps): JSX.Element => (
  <Link
    href={PATHS.OPERATIONS.UNIT_PHOTOS(item.id)}
    className={resolveUnitPhotoListCardClass(size)}
  >
    <UnitPhotoListCover item={item} />
    <UnitPhotoListBody item={item} />
  </Link>
);

export default UnitPhotoListCard;
