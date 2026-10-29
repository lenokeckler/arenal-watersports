import { resolveQueryChoice } from "@/app/utils/query-param/resolveQueryChoice";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import {
  LOGIN_NOTICE_CHOICES,
  LOGIN_NOTICE_MESSAGE,
} from "../constants/LoginNoticeMessage.constants";

export const resolveLoginNoticeMessage = (
  notice: NullableUndefined<string | string[]>
): NullableRef<string> => {
  const choice = resolveQueryChoice(
    notice,
    LOGIN_NOTICE_CHOICES
  );

  return choice ? LOGIN_NOTICE_MESSAGE[choice] : null;
};
