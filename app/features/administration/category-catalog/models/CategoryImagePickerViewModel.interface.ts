import type { NullableRef } from "@/app/types";
import type { CategoryImageFileChangeEvent } from "./CategoryImageFileChangeEvent.type";

export interface CategoryImagePickerViewModel {
  inputRef: React.RefObject<NullableRef<HTMLInputElement>>;
  onOpen: () => void;
  onChange: (event: CategoryImageFileChangeEvent) => void;
}
