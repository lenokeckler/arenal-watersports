import { PERSONAL_EMAIL_INTENT } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { PersonalEmailChange } from "./models/PersonalEmailChange.type";

export const resolveWrittenAddress = (
  change: PersonalEmailChange
): NullableRef<string> =>
  change.intent === PERSONAL_EMAIL_INTENT.SAVE
    ? change.address
    : null;
