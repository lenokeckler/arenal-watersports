import { PERSONAL_EMAIL_STATUS_BY_STATE } from "../constants/PersonalEmailStatus.constants";
import {
  PASSWORD_ENTRY_DEFINITION,
  PERSONAL_EMAIL_ENTRY_DEFINITION,
} from "../constants/ProfileEntries.constants";
import type { BuildProfileEntriesInput } from "../models/BuildProfileEntriesInput.interface";
import type { ProfileEntry } from "../models/ProfileEntry.interface";

export const buildProfileEntries = ({
  personalEmailState,
}: BuildProfileEntriesInput): ProfileEntry[] => [
  { ...PASSWORD_ENTRY_DEFINITION, status: null },
  {
    ...PERSONAL_EMAIL_ENTRY_DEFINITION,
    status:
      PERSONAL_EMAIL_STATUS_BY_STATE[personalEmailState],
  },
];
