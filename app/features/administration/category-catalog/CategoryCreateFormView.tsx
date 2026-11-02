"use client";

import CategoryCreateFormActions from "./components/CategoryCreateFormActions";
import CategoryCreateFormFields from "./components/CategoryCreateFormFields";
import CategoryCreateFormHeader from "./components/CategoryCreateFormHeader";
import { useCategoryCreateFormViewModel } from "./hooks/useCategoryCreateFormViewModel";
import { CATEGORY_LIST_CONTENT_CLASS } from "./styles/CategoryList.styles";
import { CATEGORY_CREATE_FORM_CARD_CLASS } from "./styles/CategoryCreateForm.styles";

const CategoryCreateFormView = (): React.JSX.Element => {
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
  );
};

export default CategoryCreateFormView;
