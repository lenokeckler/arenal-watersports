import { readEquipmentJobs } from "@/app/services/equipment/readEquipmentJobs";
import { readEquipmentReports } from "@/app/services/equipment/readEquipmentReports";
import { readPendingDamageCount } from "@/app/services/equipment/readPendingDamageCount";
import { readPhotoUnits } from "@/app/services/equipment/readPhotoUnits";
import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { resolveHistoryWindow } from "@/app/utils/equipment-months/resolveHistoryWindow";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EQUIPMENT_HUB_OPERATION } from "../constants/EquipmentHub.constants";
import type { EquipmentHubData } from "../models/EquipmentHubData.interface";
import { countMissingPhotos } from "../utils/countMissingPhotos";
import { countWaitingMaintenance } from "../utils/countWaitingMaintenance";

export const getEquipmentHub =
  async (): Promise<EquipmentHubData> => {
    const supabase = await getOperationsSupabaseClient();
    const { months, since } = resolveHistoryWindow();
    const [jobs, reports, pending, photos, maintenance] =
      await Promise.all([
        readEquipmentJobs(supabase, { since }),
        readEquipmentReports(supabase, { since }),
        readPendingDamageCount(supabase),
        readPhotoUnits(supabase),
        supabase.rpc("maintenance_units"),
      ]);
    throwIfSupabaseError(
      maintenance.error,
      EQUIPMENT_HUB_OPERATION.LOAD_MAINTENANCE
    );

    return {
      jobs,
      months,
      pendingDamage: pending,
      photosMissing: countMissingPhotos(photos),
      reports,
      waitingMaintenance: countWaitingMaintenance(
        maintenance.data ?? []
      ),
    };
  };
