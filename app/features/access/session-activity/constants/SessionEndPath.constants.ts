import {
  PATHS,
  SESSION_STATE,
  type SessionState,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { buildLoginSessionIdlePath } from "@/app/utils/pathname/buildLoginSessionIdlePath";

export const SESSION_END_PATH: Record<
  SessionState,
  NullableRef<string>
> = {
  [SESSION_STATE.ENDED]: PATHS.ACCESS.LOGIN,
  [SESSION_STATE.IDLE]: buildLoginSessionIdlePath(),
  [SESSION_STATE.LIVE]: null,
};
