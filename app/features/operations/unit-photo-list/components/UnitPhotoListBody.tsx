import ImpactCount from "@/app/components/impact-count/ImpactCount";
import InlineText from "@/app/components/text/InlineText";
import { UNIT_PHOTO_BASIC_ANGLES } from "@/app/constants";
import { UNIT_PHOTO_LIST_COPY } from "../constants/UnitPhotoListCopy.constants";
import type { UnitPhotoListItemProps } from "../models/UnitPhotoListItemProps.interface";
import {
  UNIT_PHOTO_LIST_BODY_CLASS,
  UNIT_PHOTO_LIST_CODE_CLASS,
  UNIT_PHOTO_LIST_DETAIL_CLASS,
  UNIT_PHOTO_LIST_METER_CLASS,
  UNIT_PHOTO_LIST_ROW_CLASS,
} from "../styles/UnitPhotoList.styles";
import type { JSX } from "react";

const UnitPhotoListBody = ({
  item: { basicCount, code, impactCount },
}: UnitPhotoListItemProps): JSX.Element => {
  const total = UNIT_PHOTO_BASIC_ANGLES.length;

  return (
    <InlineText className={UNIT_PHOTO_LIST_BODY_CLASS}>
      <InlineText className={UNIT_PHOTO_LIST_ROW_CLASS}>
        <InlineText className={UNIT_PHOTO_LIST_CODE_CLASS}>
          {code}
        </InlineText>
        <ImpactCount count={impactCount} />
      </InlineText>
      <InlineText className={UNIT_PHOTO_LIST_DETAIL_CLASS}>
        {UNIT_PHOTO_LIST_COPY.DETAIL(basicCount, total)}
      </InlineText>
      <progress
        className={UNIT_PHOTO_LIST_METER_CLASS}
        aria-label={UNIT_PHOTO_LIST_COPY.CARD_LABEL(
          code,
          basicCount,
          total
        )}
        max={total}
        value={basicCount}
      />
    </InlineText>
  );
};

export default UnitPhotoListBody;
