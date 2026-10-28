import type { NullableRef } from "@/app/types";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";

export type PersonalEmailServerAction = (
  previousError: NullableRef<PersonalEmailError>,
  formData: FormData
) => Promise<NullableRef<PersonalEmailError>>;
