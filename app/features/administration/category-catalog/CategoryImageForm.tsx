"use client";

import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import CategoryImageFormActions from "./components/CategoryImageFormActions";
import CategoryImageFormHeader from "./components/CategoryImageFormHeader";
import CategoryImagePicker from "./components/CategoryImagePicker";
import CategoryImagePreview from "./components/CategoryImagePreview";
import { CATEGORY_IMAGE_FORM_FIELD_ID } from "./constants/CategoryImageFormFieldId.constants";
import { useCategoryImageFormViewModel } from "./hooks/useCategoryImageFormViewModel";
import type { CategoryImageFormViewModelProps } from "./models/CategoryImageFormViewModelProps.interface";
import { CATEGORY_CREATE_FORM_CARD_CLASS } from "./styles/CategoryCreateForm.styles";
import { CATEGORY_IMAGE_ERROR_CLASS } from "./styles/CategoryImage.styles";
import { CATEGORY_LIST_CONTENT_CLASS } from "./styles/CategoryList.styles";

const CategoryImageForm = ({
  image,
}: CategoryImageFormViewModelProps): React.JSX.Element => {
  const {
    errorMessage,
    formState,
    previewUrl,
    ...actions
  } = useCategoryImageFormViewModel({ image });

  return (
    <div className={CATEGORY_LIST_CONTENT_CLASS}>
      <CategoryImageFormHeader />
      <div className={CATEGORY_CREATE_FORM_CARD_CLASS}>
        <CategoryImagePreview
          formState={formState}
          previewUrl={previewUrl}
        />
        {errorMessage && (
          <Text
            id={CATEGORY_IMAGE_FORM_FIELD_ID.ERROR}
            role={ARIA_ROLE.ALERT}
            className={CATEGORY_IMAGE_ERROR_CLASS}
          >
            {errorMessage}
          </Text>
        )}
        <CategoryImagePicker
          isDisabled={actions.isSubmitting}
          onPickFile={actions.onPickFile}
        />
        <CategoryImageFormActions
          formState={formState}
          {...actions}
        />
      </div>
    </div>
  );
};

export default CategoryImageForm;
