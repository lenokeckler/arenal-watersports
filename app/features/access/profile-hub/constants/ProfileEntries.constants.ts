import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS } from "@/app/constants";
import type { ProfileEntryDefinition } from "../models/ProfileEntryDefinition.type";
import { PROFILE_COPY } from "./ProfileCopy.constants";
import { PROFILE_ENTRY_ID } from "./ProfileEntryId.constants";

export const PASSWORD_ENTRY_DEFINITION: ProfileEntryDefinition =
  {
    href: PATHS.PROFILE.PASSWORD,
    icon: MATERIAL_ICON_NAME.LOCK_RESET,
    id: PROFILE_ENTRY_ID.PASSWORD,
    label: PROFILE_COPY.PASSWORD_ENTRY,
  };

export const PERSONAL_EMAIL_ENTRY_DEFINITION: ProfileEntryDefinition =
  {
    href: PATHS.PROFILE.EMAIL,
    icon: MATERIAL_ICON_NAME.MAIL,
    id: PROFILE_ENTRY_ID.PERSONAL_EMAIL,
    label: PROFILE_COPY.PERSONAL_EMAIL_ENTRY,
  };
