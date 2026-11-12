import type { NullableRef } from "@/app/types";
import type { CategoryImageFormState } from "../constants/CategoryImageFormState.constants";

export interface CategoryImagePreviewProps {
  formState: CategoryImageFormState;
  previewUrl: NullableRef<string>;
}
