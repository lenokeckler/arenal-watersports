import type { PersonalEmailIntent } from "@/app/constants";
import type { Nullable } from "@/app/types";
import type { PersonalEmailSubmitHandler } from "./PersonalEmailSubmitHandler.type";

export interface PersonalEmailSubmitGuard {
  hasSubmitted: boolean;
  intent: PersonalEmailIntent;
  invalidSubmitCount: number;
  onSubmit: PersonalEmailSubmitHandler;
  pendingIntent: Nullable<PersonalEmailIntent>;
}
