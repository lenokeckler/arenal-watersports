import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";

export type PasswordChangeServerAction = (
  previousError: NullableRef<PasswordChangeError>,
  formData: FormData
) => Promise<NullableRef<PasswordChangeError>>;
