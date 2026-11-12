import { redirect } from "next/navigation";
import {
  PATHS,
  SIGN_IN_NOTICE_QUERY_PARAM,
} from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";
import type { CodedError } from "@/app/utils/reauthentication/models/CodedError.interface";
import { resolveBlockedSignInNoticeReason } from "@/app/utils/reauthentication/resolveBlockedSignInNoticeReason";

export const redirectWhenSignInBlocked = (
  error: CodedError
): void => {
  const blockedReason =
    resolveBlockedSignInNoticeReason(error);

  if (blockedReason) {
    redirect(
      appendQueryParam(
        PATHS.ACCESS.LOGIN,
        SIGN_IN_NOTICE_QUERY_PARAM,
        blockedReason
      )
    );
  }
};
