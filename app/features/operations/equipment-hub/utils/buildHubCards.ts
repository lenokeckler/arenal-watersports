import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS } from "@/app/constants";
import { EQUIPMENT_HUB_COPY } from "../constants/EquipmentHubCopy.constants";
import type { EquipmentHubCard } from "../models/EquipmentHubCard.interface";
import type { EquipmentHubData } from "../models/EquipmentHubData.interface";

export const buildHubCards = ({
  pendingDamage,
  photosMissing,
  waitingMaintenance,
}: EquipmentHubData): EquipmentHubCard[] => [
  {
    detail:
      EQUIPMENT_HUB_COPY.DAMAGE_PENDING(pendingDamage),
    href: PATHS.OPERATIONS.DAMAGE_REPORTS,
    icon: MATERIAL_ICON_NAME.WARNING,
    title: EQUIPMENT_HUB_COPY.CARDS.damages,
  },
  {
    detail:
      EQUIPMENT_HUB_COPY.PHOTOS_MISSING(photosMissing),
    href: PATHS.OPERATIONS.UNIT_PHOTOS_ROOT,
    icon: MATERIAL_ICON_NAME.PHOTO_CAMERA,
    title: EQUIPMENT_HUB_COPY.CARDS.photos,
  },
  {
    detail: EQUIPMENT_HUB_COPY.MAINTENANCE_WAITING(
      waitingMaintenance
    ),
    href: PATHS.OPERATIONS.MAINTENANCE,
    icon: MATERIAL_ICON_NAME.BUILD,
    title: EQUIPMENT_HUB_COPY.CARDS.maintenance,
  },
];
