import type { PersonalEmailIntent } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface PersonalEmailRemoveButtonProps {
  isPending: boolean;
  pendingIntent: NullableRef<PersonalEmailIntent>;
}
