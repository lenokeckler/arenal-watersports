"use server";

import { redirect } from "next/navigation";
import {
  PATHS,
  PROFILE_NOTICE,
  PROFILE_NOTICE_QUERY_PARAM,
  SIGN_IN_NOTICE_QUERY_PARAM,
} from "@/app/constants";
import { changeOwnPassword } from "@/app/services/authentication";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";
import type { PasswordChangeServerAction } from "../models/PasswordChangeServerAction.type";
import { readPasswordChangeInput } from "../utils/readPasswordChangeInput";
import { resolveBlockedSignInNoticeReason } from "../utils/resolveBlockedSignInNoticeReason";
import { runPasswordChange } from "../utils/runPasswordChange";

export const submitOwnPasswordChange: PasswordChangeServerAction =
  async (_previousError, formData) => {
    const result = await runPasswordChange(
      changeOwnPassword,
      readPasswordChangeInput(formData)
    );

    if (result.ok) {
      redirect(
        appendQueryParam(
          PATHS.PROFILE.ROOT,
          PROFILE_NOTICE_QUERY_PARAM,
          PROFILE_NOTICE.PASSWORD_CHANGED
        )
      );
    }

    const blockedReason = resolveBlockedSignInNoticeReason(
      result.error
    );

    if (blockedReason) {
      redirect(
        appendQueryParam(
          PATHS.ACCESS.LOGIN,
          SIGN_IN_NOTICE_QUERY_PARAM,
          blockedReason
        )
      );
    }

    return result.error;
  };
