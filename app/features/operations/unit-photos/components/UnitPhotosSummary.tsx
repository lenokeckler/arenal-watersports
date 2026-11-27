import ImpactCount from "@/app/components/impact-count/ImpactCount";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  TitleVariant,
  UNIT_PHOTO_BASIC_ANGLES,
} from "@/app/constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import type { UnitPhotosContentProps } from "../models/UnitPhotosContentProps.interface";
import { countBasicPhotos } from "../utils/countBasicPhotos";
import {
  UNIT_PHOTOS_IMPACTS_CLASS,
  UNIT_PHOTOS_MESSAGE_CLASS,
  UNIT_PHOTOS_UNIT_CLASS,
  UNIT_PHOTOS_UNIT_ROW_CLASS,
} from "../styles/UnitPhotos.styles";
import type { JSX } from "react";

const UnitPhotosSummary = ({
  data: { canManage, slots, unit },
}: UnitPhotosContentProps): JSX.Element => (
  <>
    <div className={UNIT_PHOTOS_UNIT_ROW_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={`${unit.code}${UNIT_PHOTOS_COPY.TITLE_SEPARATOR}${unit.categoryName}`}
        className={UNIT_PHOTOS_UNIT_CLASS}
      />
      <ImpactCount count={unit.impactCount} />
    </div>
    <Text className={UNIT_PHOTOS_IMPACTS_CLASS}>
      {UNIT_PHOTOS_COPY.BASIC_PROGRESS(
        countBasicPhotos(slots),
        UNIT_PHOTO_BASIC_ANGLES.length
      )}
    </Text>
    {!canManage && (
      <Text className={UNIT_PHOTOS_MESSAGE_CLASS}>
        {UNIT_PHOTOS_COPY.VIEW_ONLY}
      </Text>
    )}
  </>
);

export default UnitPhotosSummary;
