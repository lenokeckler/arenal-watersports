import type { NullableRef } from "@/app/types";
import type { CategoryConfigurePhotoProps } from "./CategoryConfigurePhotoProps.interface";

export interface CategoryConfigurePhotoViewModel {
  pickedFile: NullableRef<File>;
  props: CategoryConfigurePhotoProps;
}
