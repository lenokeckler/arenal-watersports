import { STRING } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "@/app/features/board/equipment-board/constants/EquipmentBoardCopy.constants";
import {
  E2E_CATEGORY_GROUP_LABEL,
  E2E_CATEGORY_WITH_GROUP_NAME,
  E2E_CATEGORY_WITH_RECORDS_NAME,
} from "./E2eCategoryFixtures.constants";
import { E2E_PROJECT } from "./E2eRuntime.constants";

export const E2E_BOARD_SCREENSHOT_BASENAME =
  "us-tab-01-board";

export const E2E_BOARD_CARD_SELECTOR = (
  listItemRole: string
): string => `:scope > [role="${listItemRole}"]`;

export const E2E_BOARD_STANDALONE_CARDS = [
  { label: "Cuadraciclo", totalCount: 8 },
  { label: E2E_CATEGORY_WITH_RECORDS_NAME, totalCount: 4 },
  { label: "Lancha", totalCount: 2 },
  { label: "Paddleboard", totalCount: 9 },
] as const;

const E2E_BOARD_GROUP_MEMBERS = [
  { name: E2E_CATEGORY_WITH_GROUP_NAME, totalCount: 6 },
  { name: "Kayak individual", totalCount: 3 },
] as const;

export const E2E_BOARD_GROUP = {
  LABEL: E2E_CATEGORY_GROUP_LABEL,
  MEMBERS: E2E_BOARD_GROUP_MEMBERS,
  TOTAL_COUNT: E2E_BOARD_GROUP_MEMBERS.reduce(
    (total, member) => total + member.totalCount,
    0
  ),
} as const;

export const E2E_BOARD_HIDDEN_CATEGORY_NAMES = [
  "Chaleco",
  "Remo de kayak",
  "Remo de paddleboard",
  "Extintor",
] as const;

export const E2E_BOARD_IDLE_IN_USE_COUNT = 0;

export const E2E_BOARD_LAYOUT = {
  ROW_TOLERANCE_PX: 1,
} as const;

export const E2E_BOARD_CARDS_PER_ROW: Record<
  string,
  number
> = {
  [E2E_PROJECT.DEFAULT]: 4,
  [E2E_PROJECT.MOBILE]: 2,
};

export const resolveBoardFreeText = (
  freeCount: number
): string =>
  `${freeCount}${STRING.SPACE}${EQUIPMENT_BOARD_COPY.FREE_LABEL_PLURAL}`;

export const resolveBoardUsageText = (
  totalCount: number
): string =>
  EQUIPMENT_BOARD_COPY.IN_USE_OF_TOTAL(
    E2E_BOARD_IDLE_IN_USE_COUNT,
    totalCount
  );
