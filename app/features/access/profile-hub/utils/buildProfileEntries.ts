import {
  PASSWORD_ENTRY_DEFINITION,
  PERSONAL_EMAIL_ENTRY_DEFINITION,
} from "../constants/ProfileEntries.constants";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import type { BuildProfileEntriesInput } from "../models/BuildProfileEntriesInput.interface";
import type { ProfileEntry } from "../models/ProfileEntry.interface";

export const buildProfileEntries = ({
  hasPersonalEmail,
}: BuildProfileEntriesInput): ProfileEntry[] => [
  { ...PASSWORD_ENTRY_DEFINITION, status: null },
  {
    ...PERSONAL_EMAIL_ENTRY_DEFINITION,
    status: hasPersonalEmail
      ? PROFILE_COPY.STATUS_REGISTERED
      : PROFILE_COPY.STATUS_NOT_REGISTERED,
  },
];
