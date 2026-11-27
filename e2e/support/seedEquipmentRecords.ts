import type { DispatchSheetFixture } from "./models/DispatchSheetFixture.interface";

export const seedEquipmentRecords = async (
  dispatchSheet: DispatchSheetFixture,
  unit: string
): Promise<void> => {
  await dispatchSheet.addDamageReports();
  await dispatchSheet.addMaintenanceJobs();
  await dispatchSheet.addUnitPhoto(unit, "front");
};
