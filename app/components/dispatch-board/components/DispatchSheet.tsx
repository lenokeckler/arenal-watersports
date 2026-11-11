"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import { useDispatchSheetViewModel } from "../hooks/useDispatchSheetViewModel";
import type { DispatchSheetProps } from "../models/DispatchSheetProps.interface";
import DispatchSheetBody from "./DispatchSheetBody";

const DispatchSheet = ({
  customerName,
  initialCategoryId,
  onClose,
  onDispatched,
  preselectedUnitIds,
  reservationId,
}: DispatchSheetProps): React.JSX.Element => {
  const viewModel = useDispatchSheetViewModel({
    initialCategoryId,
    onDispatched,
    reservationId,
  });

  return (
    <ActionSheet
      title={`${DISPATCH_SHEET_COPY.TITLE_PREFIX}${customerName}`}
      onClose={onClose}
    >
      <DispatchSheetBody
        preselectedUnitIds={preselectedUnitIds}
        viewModel={viewModel}
      />
    </ActionSheet>
  );
};

export default DispatchSheet;
