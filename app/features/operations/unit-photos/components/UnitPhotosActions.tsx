import Link from "@/app/components/link/Link";
import { PATHS } from "@/app/constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import type { UnitPhotosProps } from "../models/UnitPhotosProps.interface";
import {
  UNIT_PHOTOS_ACTIONS_CLASS,
  UNIT_PHOTOS_ACTION_CLASS,
} from "../styles/UnitPhotos.styles";
import type { JSX } from "react";

const UnitPhotosActions = ({
  unitId,
}: UnitPhotosProps): JSX.Element => (
  <div className={UNIT_PHOTOS_ACTIONS_CLASS}>
    <Link
      href={PATHS.OPERATIONS.DAMAGE_REPORT_FOR_UNIT(unitId)}
      className={UNIT_PHOTOS_ACTION_CLASS}
    >
      {UNIT_PHOTOS_COPY.REPORT_DAMAGE}
    </Link>
    <Link
      href={PATHS.OPERATIONS.UNIT_HISTORY(unitId)}
      className={UNIT_PHOTOS_ACTION_CLASS}
    >
      {UNIT_PHOTOS_COPY.VIEW_HISTORY}
    </Link>
  </div>
);

export default UnitPhotosActions;
