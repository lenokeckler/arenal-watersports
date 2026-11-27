import type { NullableRef } from "@/app/types";
import type { CategoryImageFormState } from "../constants/CategoryImageFormState.constants";
import type { CategoryImagePickerOptions } from "./CategoryImagePickerOptions.interface";

export interface CategoryConfigurePhotoProps extends CategoryImagePickerOptions {
  errorMessage: NullableRef<string>;
  formState: CategoryImageFormState;
  previewUrl: NullableRef<string>;
}
