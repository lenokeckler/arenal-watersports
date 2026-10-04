"use client";

import Section from "@/app/components/section/Section";
import CategoryCreateFormActions from "./components/CategoryCreateFormActions";
import CategoryCreateFormFields from "./components/CategoryCreateFormFields";
import CategoryCreateFormHeader from "./components/CategoryCreateFormHeader";
import { CATEGORY_CREATE_FORM_TITLE_ID } from "./constants/CategoryCreateFormTitleId.constants";
import { useCategoryCreateFormViewModel } from "./hooks/useCategoryCreateFormViewModel";
import { CATEGORY_LIST_CONTENT_CLASS } from "./styles/CategoryList.styles";
import { CATEGORY_CREATE_FORM_CARD_CLASS } from "./styles/CategoryCreateForm.styles";

const CategoryCreateForm = (): React.JSX.Element => {
  const {
    values,
    errors,
    isSubmitting,
    onBack,
    onNameChange,
    onTrackingModeChange,
    onGroupNameChange,
    onSubmit,
  } = useCategoryCreateFormViewModel();

  return (
    <Section ariaLabel={CATEGORY_CREATE_FORM_TITLE_ID}>
      <div className={CATEGORY_LIST_CONTENT_CLASS}>
        <CategoryCreateFormHeader />
        <form onSubmit={onSubmit}>
          <div className={CATEGORY_CREATE_FORM_CARD_CLASS}>
            <CategoryCreateFormFields
              values={values}
              errors={errors}
              isSubmitting={isSubmitting}
              onNameChange={onNameChange}
              onTrackingModeChange={onTrackingModeChange}
              onGroupNameChange={onGroupNameChange}
            />
            <CategoryCreateFormActions
              isSubmitting={isSubmitting}
              onBack={onBack}
            />
          </div>
        </form>
      </div>
    </Section>
  );
};

export default CategoryCreateForm;
