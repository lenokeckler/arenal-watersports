import type { NullableRef } from "@/app/types";
import type { SessionIdleWarningProps } from "./SessionIdleWarningProps.interface";

export interface SessionActivityViewModel {
  warning: NullableRef<SessionIdleWarningProps>;
}
