import {
  PATHS,
  PROFILE_NOTICE,
  PROFILE_NOTICE_QUERY_PARAM,
} from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";
import { UNKNOWN_NOTICE } from "./ProfileHub.constants";

export const NOTICE_URL_CASES = Object.values(
  PROFILE_NOTICE
).map(
  (notice) =>
    [
      notice,
      appendQueryParam(
        PATHS.PROFILE.ROOT,
        PROFILE_NOTICE_QUERY_PARAM,
        notice
      ),
    ] as const
);

export const UNKNOWN_NOTICE_URL = appendQueryParam(
  PATHS.PROFILE.ROOT,
  PROFILE_NOTICE_QUERY_PARAM,
  UNKNOWN_NOTICE
);
