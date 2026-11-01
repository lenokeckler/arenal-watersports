import {
  LOGIN_NOTICE,
  LOGIN_NOTICE_QUERY_PARAM,
  PATHS,
} from "@/app/constants";
import { appendQueryParam } from "./appendQueryParam";

export const buildLoginSessionIdlePath = (): string =>
  appendQueryParam(
    PATHS.ACCESS.LOGIN,
    LOGIN_NOTICE_QUERY_PARAM,
    LOGIN_NOTICE.SESSION_IDLE
  );
