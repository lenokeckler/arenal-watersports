import Button from "@/app/components/button/Button";
import { INPUT_TYPES } from "@/app/components/form-field/constants/InputTypes.constants";
import { BUTTON } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { CATEGORY_IMAGE_FORM_FIELD_ID } from "../constants/CategoryImageFormFieldId.constants";
import { CATEGORY_IMAGE_PICKER_ACCEPT } from "../constants/CategoryImageView.constants";
import { useCategoryImagePicker } from "../hooks/useCategoryImagePicker";
import type { CategoryImagePickerProps } from "../models/CategoryImagePickerProps.interface";
import {
  CATEGORY_IMAGE_PICKER_BUTTON_CLASS,
  CATEGORY_IMAGE_PICKER_INPUT_CLASS,
} from "../styles/CategoryImage.styles";

const CategoryImagePicker = ({
  isDisabled,
  onPickFile,
}: CategoryImagePickerProps): React.JSX.Element => {
  const { inputRef, onChange, onOpen } =
    useCategoryImagePicker({ onPickFile });

  return (
    <>
      <Button
        variant={BUTTON.SECONDARY}
        type="button"
        disabled={isDisabled}
        onClick={onOpen}
        className={CATEGORY_IMAGE_PICKER_BUTTON_CLASS}
      >
        {CATEGORY_IMAGE_COPY.CHOOSE_BUTTON}
      </Button>
      <input
        ref={inputRef}
        id={CATEGORY_IMAGE_FORM_FIELD_ID.FILE_INPUT}
        type={INPUT_TYPES.FILE}
        accept={CATEGORY_IMAGE_PICKER_ACCEPT}
        aria-label={CATEGORY_IMAGE_COPY.FILE_INPUT_LABEL}
        className={CATEGORY_IMAGE_PICKER_INPUT_CLASS}
        disabled={isDisabled}
        onChange={onChange}
      />
    </>
  );
};

export default CategoryImagePicker;
