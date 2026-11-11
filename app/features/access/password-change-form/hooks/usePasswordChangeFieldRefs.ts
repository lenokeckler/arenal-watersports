import { useMemo, useRef } from "react";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeFieldRefs } from "../models/PasswordChangeFieldRefs.type";

export const usePasswordChangeFieldRefs =
  (): PasswordChangeFieldRefs => {
    const currentPasswordRef =
      useRef<NullableRef<HTMLInputElement>>(null);
    const newPasswordRef =
      useRef<NullableRef<HTMLInputElement>>(null);
    const confirmPasswordRef =
      useRef<NullableRef<HTMLInputElement>>(null);

    return useMemo(
      () => ({
        [PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD]:
          confirmPasswordRef,
        [PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD]:
          currentPasswordRef,
        [PASSWORD_CHANGE_FIELD.NEW_PASSWORD]:
          newPasswordRef,
      }),
      []
    );
  };
