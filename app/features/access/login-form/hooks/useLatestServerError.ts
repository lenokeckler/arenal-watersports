import { useRef, useState } from "react";
import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import type { NullableRef } from "@/app/types";
import type { LatestServerError } from "../models/LatestServerError.interface";

export const useLatestServerError =
  (): LatestServerError => {
    const [error, setError] =
      useState<NullableRef<SignInError>>(null);
    const latestSubmissionId = useRef(0);

    return {
      clear: () => {
        latestSubmissionId.current += 1;
        setError(null);
        return latestSubmissionId.current;
      },
      error,
      settle: (submissionId, result) => {
        if (submissionId !== latestSubmissionId.current) {
          return false;
        }
        setError(result);
        return true;
      },
    };
  };
