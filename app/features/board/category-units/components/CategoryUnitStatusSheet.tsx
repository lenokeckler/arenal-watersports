"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  INVENTORY_UNIT_STATUS,
} from "@/app/constants";
import { resolveMaintenanceNewPath } from "@/app/utils/maintenance-paths/resolveMaintenanceNewPath";
import {
  CATEGORY_UNIT_STATUS_LABEL,
  CATEGORY_UNITS_COPY,
} from "../constants/CategoryUnitsCopy.constants";
import { useCategoryUnitStatus } from "../hooks/useCategoryUnitStatus";
import type { CategoryUnitStatusSheetProps } from "../models/CategoryUnitStatusSheetProps.interface";
import {
  CATEGORY_UNIT_SHEET_ACTIONS_CLASS,
  CATEGORY_UNIT_SHEET_ALERT_CLASS,
  CATEGORY_UNIT_SHEET_STACK_CLASS,
} from "../styles/CategoryUnitSheets.styles";
import {
  CATEGORY_UNIT_STATUS_HINT_CLASS,
  CATEGORY_UNIT_STATUS_LINK_CLASS,
} from "../styles/CategoryUnitStatusSheet.styles";
import CategoryUnitAccessRow from "./CategoryUnitAccessRow";
import CategoryUnitPendingDamage from "./CategoryUnitPendingDamage";
import CategoryUnitStatusDamage from "./CategoryUnitStatusDamage";
import CategoryUnitStatusJobs from "./CategoryUnitStatusJobs";

const CategoryUnitStatusSheet = ({
  hasPhotos,
  onClose,
  unit,
}: CategoryUnitStatusSheetProps): React.JSX.Element => {
  const status = useCategoryUnitStatus({ onClose, unit });
  const isDamaged =
    unit.status === INVENTORY_UNIT_STATUS.DAMAGED;
  const damage = unit.statusDetails?.damage ?? null;
  const pendingReportId =
    unit.statusDetails?.pendingReportId ?? null;

  return (
    <ActionSheet
      title={CATEGORY_UNITS_COPY.STATUS_TITLE(
        unit.code,
        CATEGORY_UNIT_STATUS_LABEL[unit.status]
      )}
      onClose={onClose}
    >
      <div className={CATEGORY_UNIT_SHEET_STACK_CLASS}>
        {pendingReportId && (
          <CategoryUnitPendingDamage
            reportId={pendingReportId}
          />
        )}
        {isDamaged ? (
          damage && (
            <CategoryUnitStatusDamage damage={damage} />
          )
        ) : (
          <>
            <CategoryUnitStatusJobs
              jobs={unit.statusDetails?.jobs ?? []}
            />
            <Text
              className={CATEGORY_UNIT_STATUS_HINT_CLASS}
            >
              {CATEGORY_UNITS_COPY.STATUS_HINT}
            </Text>
          </>
        )}
        {status.errorMessage && (
          <Text
            role={ARIA_ROLE.ALERT}
            className={CATEGORY_UNIT_SHEET_ALERT_CLASS}
          >
            {status.errorMessage}
          </Text>
        )}
        <div className={CATEGORY_UNIT_SHEET_ACTIONS_CLASS}>
          {isDamaged ? (
            <Button
              type={BUTTON_TYPES.BUTTON}
              variant={BUTTON.PRIMARY}
              isLoading={status.isSaving}
              loadingText={
                CATEGORY_UNITS_COPY.STATUS_SAVING
              }
              onClick={status.handleSendToMaintenance}
            >
              {
                CATEGORY_UNITS_COPY.STATUS_SEND_TO_MAINTENANCE
              }
            </Button>
          ) : (
            <Link
              href={resolveMaintenanceNewPath(unit.id)}
              className={CATEGORY_UNIT_STATUS_LINK_CLASS}
            >
              {CATEGORY_UNITS_COPY.STATUS_REGISTER_JOB}
            </Link>
          )}
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.SECONDARY}
            isLoading={status.isSaving}
            loadingText={CATEGORY_UNITS_COPY.STATUS_SAVING}
            onClick={status.handleReturnToService}
          >
            {CATEGORY_UNITS_COPY.STATUS_RETURN_TO_SERVICE}
          </Button>
        </div>
        <CategoryUnitAccessRow
          hasPhotos={hasPhotos}
          unitId={unit.id}
        />
      </div>
    </ActionSheet>
  );
};

export default CategoryUnitStatusSheet;
