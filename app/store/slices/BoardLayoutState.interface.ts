import type {
  BoardLayoutCard,
  BoardLayoutPreference,
} from "@/app/types";

export interface BoardLayoutState extends BoardLayoutPreference {
  cards: BoardLayoutCard[];
}
