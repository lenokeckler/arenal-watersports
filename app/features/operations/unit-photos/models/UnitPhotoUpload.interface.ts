import type { ChangeEvent } from "react";
import type { NullableRef } from "@/app/types";

export interface UnitPhotoUpload {
  errorMessage: NullableRef<string>;
  handleChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  isUploading: boolean;
  savedMessage: NullableRef<string>;
}
