"use client";

import UnitDecommissionedNotice from "./components/UnitDecommissionedNotice";
import UnitDecommissionPanel from "./components/UnitDecommissionPanel";
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
  unit,
}: UnitFormViewProps): React.JSX.Element => {
  const {
    decommissionedNotice,
    isReadOnly,
    isSubmitting,
    onSubmit,
    onBack,
    ...fields
  } = useUnitFormViewModel({ mode, category, unit });

  return (
    <div className={UNIT_LIST_CONTENT_CLASS}>
      <UnitFormHeader
        mode={mode}
        categoryName={category.name}
      />
      <form onSubmit={onSubmit}>
        <div className={UNIT_FORM_CARD_CLASS}>
          {decommissionedNotice && (
            <UnitDecommissionedNotice
              notice={decommissionedNotice}
            />
          )}
          <UnitFormFields
            {...fields}
            category={category}
            isDisabled={isSubmitting || isReadOnly}
          />
          <UnitFormActions
            mode={mode}
            isSubmitting={isSubmitting}
            isReadOnly={isReadOnly}
            onBack={onBack}
          />
        </div>
      </form>
      {unit && !isReadOnly && (
        <UnitDecommissionPanel
          categoryId={category.id}
          unitId={unit.id}
        />
      )}
    </div>
  );
};

export default UnitFormView;
