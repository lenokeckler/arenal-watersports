import { E2E_RESERVATION_HISTORY_MODE } from "../constants/E2eReservationHistoryDetail.constants";
import type { ReservationHistoryAccessMode } from "./models/ReservationHistoryAccessMode.interface";
import { signInAsActiveWorker } from "./signInAsActiveWorker";
import { signInAsSeededWorker } from "./signInAsSeededWorker";
import { signInToReservationsMode } from "./signInToReservationsMode";

export const RESERVATION_HISTORY_ACCESS_MODES: readonly ReservationHistoryAccessMode[] =
  [
    {
      signIn: signInAsActiveWorker,
      title: E2E_RESERVATION_HISTORY_MODE.OPERATIONS,
    },
    {
      signIn: signInToReservationsMode,
      title: E2E_RESERVATION_HISTORY_MODE.RESERVATIONS,
    },
    {
      signIn: signInAsSeededWorker,
      title: E2E_RESERVATION_HISTORY_MODE.ADMINISTRATION,
    },
  ];
