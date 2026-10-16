import { PATHS } from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";

const NOTICE_QUERY_PARAM = "notice";
const NOTICE_VALUE = "done";

export const RESET_PATH = "/";

export const HISTORY_STATE = { marker: "kept" };

export const CLEAN_PATH_CASES = [
  PATHS.PROFILE.ROOT,
  PATHS.ACCESS.LOGIN,
].map(
  (cleanPath) =>
    [
      appendQueryParam(
        cleanPath,
        NOTICE_QUERY_PARAM,
        NOTICE_VALUE
      ),
      cleanPath,
    ] as const
);
