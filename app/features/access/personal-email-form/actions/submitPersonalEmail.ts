"use server";

import { redirect } from "next/navigation";
import {
  PATHS,
  PROFILE_NOTICE_QUERY_PARAM,
} from "@/app/constants";
import { changeOwnPersonalEmail } from "@/app/services/authentication";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";
import { redirectWhenSignInBlocked } from "@/app/utils/server-action/redirectWhenSignInBlocked";
import { PROFILE_NOTICE_BY_INTENT } from "../constants/PersonalEmailNotice.constants";
import type { PersonalEmailServerAction } from "../models/PersonalEmailServerAction.type";
import { readPersonalEmailInput } from "../utils/readPersonalEmailInput";
import { runPersonalEmailChange } from "../utils/runPersonalEmailChange";

export const submitPersonalEmail: PersonalEmailServerAction =
  async (_previousError, formData) => {
    const result = await runPersonalEmailChange(
      changeOwnPersonalEmail,
      readPersonalEmailInput(formData)
    );

    if (result.ok) {
      redirect(
        appendQueryParam(
          PATHS.PROFILE.ROOT,
          PROFILE_NOTICE_QUERY_PARAM,
          PROFILE_NOTICE_BY_INTENT[result.intent]
        )
      );
    }

    redirectWhenSignInBlocked(result.error);

    return result.error;
  };
