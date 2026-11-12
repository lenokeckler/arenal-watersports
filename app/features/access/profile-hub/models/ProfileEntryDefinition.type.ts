import type { ProfileEntry } from "./ProfileEntry.interface";

export type ProfileEntryDefinition = Omit<
  ProfileEntry,
  "status"
>;
