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
    reservableChoice,
    errors,
    isSubmitting,
    onBack,
    onNameChange,
    onTrackingModeChange,
    onReservableChoiceChange,
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
            reservableChoice={reservableChoice}
            errors={errors}
            isSubmitting={isSubmitting}
            onNameChange={onNameChange}
            onTrackingModeChange={onTrackingModeChange}
            onReservableChoiceChange={
              onReservableChoiceChange
            }
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
