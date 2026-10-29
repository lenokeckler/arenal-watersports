"use client";

import { useActionState } from "react";
import {
  Button,
  MaterialIcon,
  Text,
} from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  INPUT_TYPES,
  WORK_AREA_LABEL,
  WORK_MODE_FIELD,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { WORK_MODE_AREA_ICON } from "../constants/WorkModeAreas.constants";
import {
  WORK_MODE_AREA_DESCRIPTION,
  WORK_MODE_COPY,
  WORK_MODE_ERROR,
} from "../constants/WorkModeCopy.constants";
import type { WorkModeCardProps } from "../models/WorkModeCardProps.interface";
import type { WorkModeChoiceState } from "../models/WorkModeChoiceState.type";
import {
  WORK_MODE_CARD_CURRENT_CLASS,
  WORK_MODE_CARD_DESCRIPTION_CLASS,
  WORK_MODE_CARD_ICON_CLASS,
  WORK_MODE_CARD_TEXT_CLASS,
  WORK_MODE_CARD_TITLE_CLASS,
  WORK_MODE_ERROR_CLASS,
  resolveWorkModeCardClassName,
} from "../styles/WorkMode.styles";

const WorkModeCard = ({
  action,
  area,
  isCurrent,
}: WorkModeCardProps): React.JSX.Element => {
  const [refusal, formAction, isPending] = useActionState<
    WorkModeChoiceState,
    FormData
  >(action, null);
  const currentLabel: NullableRef<string> = isCurrent
    ? WORK_MODE_COPY.CURRENT
    : null;

  return (
    <form action={formAction}>
      <input
        type={INPUT_TYPES.HIDDEN}
        name={WORK_MODE_FIELD.AREA}
        value={area}
      />
      <Button
        type={BUTTON_TYPES.SUBMIT}
        variant={BUTTON.BASE}
        aria-disabled={isPending}
        className={resolveWorkModeCardClassName(isCurrent)}
      >
        <MaterialIcon
          name={WORK_MODE_AREA_ICON[area]}
          className={WORK_MODE_CARD_ICON_CLASS}
        />
        <span className={WORK_MODE_CARD_TEXT_CLASS}>
          <span className={WORK_MODE_CARD_TITLE_CLASS}>
            {WORK_AREA_LABEL[area]}
          </span>
          <span
            className={WORK_MODE_CARD_DESCRIPTION_CLASS}
          >
            {WORK_MODE_AREA_DESCRIPTION[area]}
          </span>
          {currentLabel && (
            <span className={WORK_MODE_CARD_CURRENT_CLASS}>
              {currentLabel}
            </span>
          )}
        </span>
      </Button>
      {refusal && (
        <Text
          role={ARIA_ROLE.ALERT}
          className={WORK_MODE_ERROR_CLASS}
        >
          {WORK_MODE_ERROR[refusal]}
        </Text>
      )}
    </form>
  );
};

export default WorkModeCard;
