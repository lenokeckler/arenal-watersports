import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";

export type PasswordRecoveryServerAction = (
  previousError: NullableRef<PasswordRecoveryError>,
  formData: FormData
) => Promise<NullableRef<PasswordRecoveryError>>;
