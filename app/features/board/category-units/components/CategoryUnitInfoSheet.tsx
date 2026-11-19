"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import DispatchRadioField from "@/app/components/dispatch-board/components/DispatchRadioField";
import DispatchTimesStep from "@/app/components/dispatch-board/components/DispatchTimesStep";
import Link from "@/app/components/link/Link";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import Text from "@/app/components/text/Text";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  MATERIAL_ICON_NAME,
  PATHS,
} from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { useCategoryUnitInfo } from "../hooks/useCategoryUnitInfo";
import type { CategoryUnitInfoSheetProps } from "../models/CategoryUnitInfoSheetProps.interface";
import {
  CATEGORY_UNIT_RECEIVE_LINK_CLASS,
  CATEGORY_UNIT_SHEET_ACTIONS_CLASS,
  CATEGORY_UNIT_SHEET_ALERT_CLASS,
  CATEGORY_UNIT_SHEET_STACK_CLASS,
  CATEGORY_UNIT_SHEET_TOOLBAR_CLASS,
  CATEGORY_UNITS_EDIT_TOGGLE_CLASS,
} from "../styles/CategoryUnitSheets.styles";
import CategoryUnitInfoDetails from "./CategoryUnitInfoDetails";

const CategoryUnitInfoSheet = ({
  occupancy,
  onClose,
  unit,
}: CategoryUnitInfoSheetProps): React.JSX.Element => {
  const info = useCategoryUnitInfo(occupancy);

  return (
    <ActionSheet
      title={unit.code}
      onClose={onClose}
    >
      <div className={CATEGORY_UNIT_SHEET_STACK_CLASS}>
        <div className={CATEGORY_UNIT_SHEET_TOOLBAR_CLASS}>
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={
              info.isEditing
                ? BUTTON.PRIMARY
                : BUTTON.SECONDARY
            }
            className={CATEGORY_UNITS_EDIT_TOGGLE_CLASS}
            aria-pressed={info.isEditing}
            onClick={info.handleToggleEditing}
          >
            <MaterialIcon name={MATERIAL_ICON_NAME.EDIT} />
            {CATEGORY_UNITS_COPY.EDIT}
          </Button>
        </div>
        <CategoryUnitInfoDetails
          isReadOnly={!info.isEditing}
          occupancy={occupancy}
        />
        {info.isEditing && (
          <>
            <DispatchTimesStep timeState={info.timeState} />
            <DispatchRadioField radio={info.radio} />
            <Button
              type={BUTTON_TYPES.BUTTON}
              variant={BUTTON.PRIMARY}
              isLoading={info.isSaving}
              loadingText={
                CATEGORY_UNITS_COPY.MODIFY_SAVING
              }
              disabled={!info.canSave}
              onClick={info.handleSave}
            >
              {CATEGORY_UNITS_COPY.MODIFY_SAVE}
            </Button>
          </>
        )}
        {info.errorMessage && (
          <Text
            role={ARIA_ROLE.ALERT}
            className={CATEGORY_UNIT_SHEET_ALERT_CLASS}
          >
            {info.errorMessage}
          </Text>
        )}
        <div className={CATEGORY_UNIT_SHEET_ACTIONS_CLASS}>
          <Link
            href={PATHS.OPERATIONS.OUT_ON_WATER}
            className={CATEGORY_UNIT_RECEIVE_LINK_CLASS}
          >
            {CATEGORY_UNITS_COPY.RECEIVE}
          </Link>
        </div>
      </div>
    </ActionSheet>
  );
};

export default CategoryUnitInfoSheet;
