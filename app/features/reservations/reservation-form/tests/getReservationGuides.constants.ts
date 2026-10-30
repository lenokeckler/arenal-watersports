import { WORKER_STATUS } from "@/app/constants";
import { RESERVATION_GUIDE_QUERY } from "../constants/ReservationGuideQuery.constants";

export const GUIDE_QUERY_FIXTURE = {
  expires_at: null,
  full_name: "RES12 Guide One",
  id: "e3200000-0000-4000-8000-000000000002",
  status: WORKER_STATUS.ACTIVE,
  worker_marks: [
    { mark: RESERVATION_GUIDE_QUERY.GUIDE_MARK },
  ],
};

export const SUCCESS_STATUS = 200;
export const SERVER_ERROR_STATUS = 500;
