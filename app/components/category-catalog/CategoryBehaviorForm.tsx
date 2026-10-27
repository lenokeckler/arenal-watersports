"use client";

import Section from "@/app/components/section/Section";
import CategoryBehaviorFormActions from "./components/CategoryBehaviorFormActions";
import CategoryBehaviorFormFields from "./components/CategoryBehaviorFormFields";
import CategoryBehaviorFormHeader from "./components/CategoryBehaviorFormHeader";
import { CATEGORY_BEHAVIOR_FORM_TITLE_ID } from "./constants/CategoryBehaviorFormTitleId.constants";
import { useCategoryBehaviorFormViewModel } from "./hooks/useCategoryBehaviorFormViewModel";
import type { CategoryBehaviorFormViewModelProps } from "./models/CategoryBehaviorFormViewModelProps.interface";
import { CATEGORY_CREATE_FORM_CARD_CLASS } from "./styles/CategoryCreateForm.styles";
import { CATEGORY_LIST_CONTENT_CLASS } from "./styles/CategoryList.styles";

const CategoryBehaviorForm = ({
  behavior,
}: CategoryBehaviorFormViewModelProps): React.JSX.Element => {
  const { trackingMode, onSubmit, onBack, ...fields } =
    useCategoryBehaviorFormViewModel({ behavior });

  return (
    <Section ariaLabel={CATEGORY_BEHAVIOR_FORM_TITLE_ID}>
      <div className={CATEGORY_LIST_CONTENT_CLASS}>
        <CategoryBehaviorFormHeader
          trackingMode={trackingMode}
        />
        <form onSubmit={onSubmit}>
          <div className={CATEGORY_CREATE_FORM_CARD_CLASS}>
            <CategoryBehaviorFormFields {...fields} />
            <CategoryBehaviorFormActions
              isSubmitting={fields.isSubmitting}
              onBack={onBack}
            />
          </div>
        </form>
      </div>
    </Section>
  );
};

export default CategoryBehaviorForm;
