import type { NullableRef } from "@/app/types";
import type { ChangeEvent } from "react";

export interface UnitPhotoUpload {
  handleChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  isUploading: boolean;
  errorMessage: NullableRef<string>;
  savedMessage: NullableRef<string>;
}
