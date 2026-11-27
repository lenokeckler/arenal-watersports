import type { EquipmentHubData } from "../models/EquipmentHubData.interface";

export const HUB_DATA: EquipmentHubData = {
  jobs: [],
  months: [
    "2026-06",
    "2026-07",
    "2026-08",
    "2026-09",
    "2026-10",
    "2026-11",
  ],
  pendingDamage: 1,
  photosMissing: 4,
  reports: [
    {
      cause: "collision",
      createdAt: "2026-11-20T15:00:00Z",
      date: "2026-11-20",
      description: "Golpe",
      hasPhotos: true,
      hits: 1,
      id: "report",
      isPending: false,
      isRetired: false,
      reservationId: null,
      unitCode: "JET-01",
      unitId: "unit",
    },
  ],
  waitingMaintenance: 2,
};
