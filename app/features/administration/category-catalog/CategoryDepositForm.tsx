"use client";

import CategoryDepositFormActions from "./components/CategoryDepositFormActions";
import CategoryDepositFormFields from "./components/CategoryDepositFormFields";
import CategoryDepositFormHeader from "./components/CategoryDepositFormHeader";
import { useCategoryDepositFormViewModel } from "./hooks/useCategoryDepositFormViewModel";
import type { CategoryDepositFormViewModelProps } from "./models/CategoryDepositFormViewModelProps.interface";
import { CATEGORY_CREATE_FORM_CARD_CLASS } from "./styles/CategoryCreateForm.styles";
import { CATEGORY_LIST_CONTENT_CLASS } from "./styles/CategoryList.styles";

const CategoryDepositForm = ({
  deposit,
}: CategoryDepositFormViewModelProps): React.JSX.Element => {
  const { onSubmit, onBack, ...fields } =
    useCategoryDepositFormViewModel({ deposit });

  return (
    <div className={CATEGORY_LIST_CONTENT_CLASS}>
      <CategoryDepositFormHeader />
      <form onSubmit={onSubmit}>
        <div className={CATEGORY_CREATE_FORM_CARD_CLASS}>
          <CategoryDepositFormFields {...fields} />
          <CategoryDepositFormActions
            isSubmitting={fields.isSubmitting}
            onBack={onBack}
          />
        </div>
      </form>
    </div>
  );
};

export default CategoryDepositForm;
