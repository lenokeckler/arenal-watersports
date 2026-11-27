import type { ChangeEvent } from "react";

export interface UnitPhotoUpload {
  handleChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  isUploading: boolean;
}
