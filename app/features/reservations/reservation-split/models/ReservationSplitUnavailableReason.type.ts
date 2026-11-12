import type { RESERVATION_SPLIT_BLOCK } from "../constants/ReservationSplitBlock.constants";
import type { ReservationSplitBlock } from "./ReservationSplitBlock.type";

export type ReservationSplitUnavailableReason = Exclude<
  ReservationSplitBlock,
  typeof RESERVATION_SPLIT_BLOCK.NONE
>;
