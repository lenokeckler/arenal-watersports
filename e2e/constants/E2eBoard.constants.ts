import { PATHS } from "@/app/constants";
import { resolveFreeOfTotalText } from "@/app/features/board/equipment-board/utils/resolveFreeOfTotalText";
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

export const E2E_BOARD_LAYOUT = {
  MIN_VISIBLE_ROWS: 2,
  ROW_TOLERANCE_PX: 1,
} as const;

export const E2E_BOARD_LAYOUT_VIEWPORTS = [
  { height: 844, name: "phone portrait", width: 390 },
  { height: 768, name: "small laptop", width: 1024 },
  { height: 768, name: "laptop", width: 1366 },
  { height: 1080, name: "full HD desktop", width: 1920 },
] as const;

export const E2E_BOARD_CARDS_PER_ROW: Record<
  string,
  number
> = {
  [E2E_PROJECT.DEFAULT]: 3,
  [E2E_PROJECT.MOBILE]: 2,
};

export const resolveBoardChipText = (
  totalCount: number
): string => resolveFreeOfTotalText(totalCount, totalCount);

export const E2E_ARIA_CURRENT_ATTRIBUTE = "aria-current";

export const E2E_BOARD_CATEGORY_URL_PATTERN = new RegExp(
  `${PATHS.BOARD_CATEGORIES}/[0-9a-f-]+$`
);

export const E2E_BOARD_CUADRACICLO = {
  LABEL: "Cuadraciclo",
  UNIT_CODES: [
    "CUAD-01",
    "CUAD-02",
    "CUAD-03",
    "CUAD-04",
    "CUAD-05",
    "CUAD-06",
    "CUAD-07",
    "CUAD-08",
  ],
} as const;

export const E2E_BOARD_KAYAK_SWITCH = {
  FIRST: { name: "Kayak doble", unitCode: "KD-01" },
  SECOND: { name: "Kayak individual", unitCode: "KI-01" },
} as const;

export const E2E_BOARD_REALTIME = {
  CATEGORY_LABEL: "Paddleboard",
  CONVERGENCE_TIMEOUT_MS: 45_000,
  FREE_AFTER_DAMAGE: 8,
  TOTAL_COUNT: 9,
  UNIT_CODE: "PB-09",
} as const;
