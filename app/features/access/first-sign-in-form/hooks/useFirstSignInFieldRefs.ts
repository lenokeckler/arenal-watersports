import { useMemo, useRef } from "react";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import type { NullableRef } from "@/app/types";
import type { FirstSignInFieldRefs } from "../models/FirstSignInFieldRefs.type";

export const useFirstSignInFieldRefs =
  (): FirstSignInFieldRefs => {
    const currentPasswordRef =
      useRef<NullableRef<HTMLInputElement>>(null);
    const newPasswordRef =
      useRef<NullableRef<HTMLInputElement>>(null);
    const confirmPasswordRef =
      useRef<NullableRef<HTMLInputElement>>(null);

    return useMemo(
      () => ({
        [FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD]:
          confirmPasswordRef,
        [FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD]:
          currentPasswordRef,
        [FIRST_SIGN_IN_FIELD.NEW_PASSWORD]: newPasswordRef,
      }),
      []
    );
  };
