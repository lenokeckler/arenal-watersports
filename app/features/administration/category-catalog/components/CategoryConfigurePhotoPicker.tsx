import Button from "@/app/components/button/Button";
import { INPUT_TYPES } from "@/app/components/form-field/constants/InputTypes.constants";
import { BUTTON, BUTTON_TYPES } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { CATEGORY_IMAGE_PICKER_ACCEPT } from "../constants/CategoryImageView.constants";
import { useCategoryImagePicker } from "../hooks/useCategoryImagePicker";
import type { CategoryImagePickerOptions } from "../models/CategoryImagePickerOptions.interface";
import {
  CATEGORY_IMAGE_PICKER_BUTTON_CLASS,
  CATEGORY_IMAGE_PICKER_INPUT_CLASS,
} from "../styles/CategoryImage.styles";

const CategoryConfigurePhotoPicker = ({
  onPickFile,
}: CategoryImagePickerOptions): React.JSX.Element => {
  const { inputRef, onChange, onOpen } =
    useCategoryImagePicker({ onPickFile });

  return (
    <>
      <Button
        variant={BUTTON.SECONDARY}
        type={BUTTON_TYPES.BUTTON}
        onClick={onOpen}
        className={CATEGORY_IMAGE_PICKER_BUTTON_CLASS}
      >
        {CATEGORY_CONFIGURE_COPY.PHOTO_PICK}
      </Button>
      <input
        ref={inputRef}
        type={INPUT_TYPES.FILE}
        accept={CATEGORY_IMAGE_PICKER_ACCEPT}
        aria-label={CATEGORY_IMAGE_COPY.FILE_INPUT_LABEL}
        className={CATEGORY_IMAGE_PICKER_INPUT_CLASS}
        onChange={onChange}
      />
    </>
  );
};

export default CategoryConfigurePhotoPicker;
