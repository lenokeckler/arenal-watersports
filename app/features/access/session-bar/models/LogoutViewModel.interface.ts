import type { NullableRef } from "@/app/types";
import type { LogoutPhase } from "./LogoutPhase.type";

export interface LogoutViewModel {
  phase: LogoutPhase;
  handlePress: () => void;
  errorMessage: NullableRef<string>;
  pendingAnnouncement: string;
}
