"use client";

import { Image, MaterialIcon } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { INPUT_TYPES } from "@/app/constants";
import {
  DISPATCH_SHEET_COPY,
  DISPATCH_SHEET_FIELD_ID,
} from "../constants/DispatchSheetCopy.constants";
import { DISPATCH_UNIT_IMAGE } from "../constants/DispatchGroupSteps.constants";
import type { DispatchUnitCardProps } from "../models/DispatchUnitCardProps.interface";
import {
  DISPATCH_UNIT_BADGE_CLASS,
  DISPATCH_UNIT_BADGE_ICON_CLASS,
  DISPATCH_UNIT_CAPTION_CLASS,
  DISPATCH_UNIT_CARD_CLASS,
  DISPATCH_UNIT_CODE_CLASS,
  DISPATCH_UNIT_IMAGE_CLASS,
  DISPATCH_UNIT_INPUT_CLASS,
  DISPATCH_UNIT_MEDIA_CLASS,
  DISPATCH_UNIT_NOTE_CLASS,
  DISPATCH_UNIT_PLACEHOLDER_CLASS,
  DISPATCH_UNIT_PLACEHOLDER_ICON_CLASS,
} from "../styles/DispatchUnitCard.styles";

const DispatchUnitCard = ({
  image,
  isDisabled,
  isSelected,
  onToggle,
  unit,
}: DispatchUnitCardProps): React.JSX.Element => {
  const inputId = `${DISPATCH_SHEET_FIELD_ID.UNIT_PREFIX}${unit.unitId}`;

  return (
    <label
      htmlFor={inputId}
      className={DISPATCH_UNIT_CARD_CLASS}
    >
      <input
        id={inputId}
        type={INPUT_TYPES.CHECKBOX}
        name={unit.unitId}
        className={DISPATCH_UNIT_INPUT_CLASS}
        checked={isSelected}
        disabled={isDisabled}
        onChange={onToggle}
      />
      <span className={DISPATCH_UNIT_BADGE_CLASS}>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.CHECK}
          className={DISPATCH_UNIT_BADGE_ICON_CLASS}
        />
      </span>
      <span className={DISPATCH_UNIT_MEDIA_CLASS}>
        {image ? (
          <Image
            alt={image.alt}
            className={DISPATCH_UNIT_IMAGE_CLASS}
            height={DISPATCH_UNIT_IMAGE.HEIGHT}
            sizes={DISPATCH_UNIT_IMAGE.SIZES}
            src={image.source}
            width={DISPATCH_UNIT_IMAGE.WIDTH}
            priority={false}
          />
        ) : (
          <span className={DISPATCH_UNIT_PLACEHOLDER_CLASS}>
            <MaterialIcon
              name={MATERIAL_ICON_NAME.SAILING}
              className={
                DISPATCH_UNIT_PLACEHOLDER_ICON_CLASS
              }
            />
          </span>
        )}
      </span>
      <span className={DISPATCH_UNIT_CAPTION_CLASS}>
        <span className={DISPATCH_UNIT_CODE_CLASS}>
          {unit.code}
        </span>
        {unit.isAssigned && (
          <span className={DISPATCH_UNIT_NOTE_CLASS}>
            {DISPATCH_SHEET_COPY.ASSIGNED_UNIT}
          </span>
        )}
      </span>
    </label>
  );
};

export default DispatchUnitCard;
