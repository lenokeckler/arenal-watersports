import { PROFILE_ENTRY_ID } from "../constants/ProfileEntryId.constants";

export type ProfileEntryId =
  (typeof PROFILE_ENTRY_ID)[keyof typeof PROFILE_ENTRY_ID];
