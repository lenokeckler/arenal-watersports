"use client";

import UnitFormActions from "./components/UnitFormActions";
import UnitFormFields from "./components/UnitFormFields";
import UnitFormHeader from "./components/UnitFormHeader";
import { useUnitFormViewModel } from "./hooks/useUnitFormViewModel";
import type { UnitFormViewProps } from "./models/UnitFormViewProps.interface";
import { UNIT_FORM_CARD_CLASS } from "./styles/UnitForm.styles";
import { UNIT_LIST_CONTENT_CLASS } from "./styles/UnitList.styles";

const UnitFormView = ({
  mode,
  category,
}: UnitFormViewProps): React.JSX.Element => {
  const { onSubmit, onBack, ...fields } =
    useUnitFormViewModel({ mode, category });

  return (
    <div className={UNIT_LIST_CONTENT_CLASS}>
      <UnitFormHeader
        mode={mode}
        categoryName={category.name}
      />
      <form onSubmit={onSubmit}>
        <div className={UNIT_FORM_CARD_CLASS}>
          <UnitFormFields
            {...fields}
            category={category}
          />
          <UnitFormActions
            mode={mode}
            isSubmitting={fields.isSubmitting}
            onBack={onBack}
          />
        </div>
      </form>
    </div>
  );
};

export default UnitFormView;
