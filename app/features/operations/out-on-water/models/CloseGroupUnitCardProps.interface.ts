import type { CloseGroupDraft } from "./CloseGroupDraft.interface";
import type { ReturnReadingRow } from "./ReturnReadingRow.interface";

export interface CloseGroupUnitCardProps {
  onChange: (
    unitId: string,
    change: Partial<CloseGroupDraft>
  ) => void;
  row: ReturnReadingRow;
}
