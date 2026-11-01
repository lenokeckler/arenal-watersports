import { resolveQueryChoice } from "@/app/utils/query-param/resolveQueryChoice";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import {
  PROFILE_NOTICE_CHOICES,
  PROFILE_NOTICE_MESSAGE,
} from "../constants/ProfileNoticeMessage.constants";

export const resolveProfileNoticeMessage = (
  notice: NullableUndefined<string | string[]>
): NullableRef<string> => {
  const choice = resolveQueryChoice(
    notice,
    PROFILE_NOTICE_CHOICES
  );

  return choice ? PROFILE_NOTICE_MESSAGE[choice] : null;
};
