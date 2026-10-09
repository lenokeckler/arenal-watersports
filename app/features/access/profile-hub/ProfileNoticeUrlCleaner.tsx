"use client";

import type { NullableRef } from "@/app/types";
import { useProfileNoticeUrlCleanerViewModel } from "./hooks/useProfileNoticeUrlCleanerViewModel";

const ProfileNoticeUrlCleaner =
  (): NullableRef<React.JSX.Element> => {
    useProfileNoticeUrlCleanerViewModel();

    return null;
  };

export default ProfileNoticeUrlCleaner;
