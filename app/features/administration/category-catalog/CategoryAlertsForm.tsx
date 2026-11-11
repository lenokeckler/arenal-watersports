"use client";

import CategoryAlertFormActions from "./components/CategoryAlertFormActions";
import CategoryAlertFormFields from "./components/CategoryAlertFormFields";
import CategoryAlertFormHeader from "./components/CategoryAlertFormHeader";
import { useCategoryAlertFormViewModel } from "./hooks/useCategoryAlertFormViewModel";
import type { CategoryAlertFormViewModelProps } from "./models/CategoryAlertFormViewModelProps.interface";
import { CATEGORY_CREATE_FORM_CARD_CLASS } from "./styles/CategoryCreateForm.styles";
import { CATEGORY_LIST_CONTENT_CLASS } from "./styles/CategoryList.styles";

const CategoryAlertsForm = ({
  alerts,
}: CategoryAlertFormViewModelProps): React.JSX.Element => {
  const { onSubmit, onBack, ...fields } =
    useCategoryAlertFormViewModel({ alerts });

  return (
    <div className={CATEGORY_LIST_CONTENT_CLASS}>
      <CategoryAlertFormHeader />
      <form onSubmit={onSubmit}>
        <div className={CATEGORY_CREATE_FORM_CARD_CLASS}>
          <CategoryAlertFormFields {...fields} />
          <CategoryAlertFormActions
            isSubmitting={fields.isSubmitting}
            onBack={onBack}
          />
        </div>
      </form>
    </div>
  );
};

export default CategoryAlertsForm;
