"use client";

import ExtraCompatibilityUnitsActions from "./components/ExtraCompatibilityUnitsActions";
import ExtraCompatibilityUnitsHeader from "./components/ExtraCompatibilityUnitsHeader";
import ExtraCompatibilityUnitsHelpers from "./components/ExtraCompatibilityUnitsHelpers";
import ExtraCompatibilityUnitsList from "./components/ExtraCompatibilityUnitsList";
import { useExtraCompatibilityUnitsFormViewModel } from "./hooks/useExtraCompatibilityUnitsFormViewModel";
import type { ExtraCompatibilityUnits } from "./models/ExtraCompatibilityUnits.interface";
import {
  EXTRA_COMPATIBILITY_UNITS_CARD_CLASS,
  EXTRA_COMPATIBILITY_UNITS_CONTENT_CLASS,
} from "./styles/ExtraCompatibilityUnits.styles";

const ExtraCompatibilityUnitsFormView = (
  compatibility: ExtraCompatibilityUnits
): React.JSX.Element => {
  const {
    hasChanges,
    isSubmitting,
    onBack,
    onClearAll,
    onSelectAll,
    onSubmit,
    onToggleUnit,
    options,
  } =
    useExtraCompatibilityUnitsFormViewModel(compatibility);

  return (
    <div
      className={EXTRA_COMPATIBILITY_UNITS_CONTENT_CLASS}
    >
      <ExtraCompatibilityUnitsHeader
        categoryName={compatibility.category.name}
        extraName={compatibility.extra.name}
      />
      <form onSubmit={onSubmit}>
        <div
          className={EXTRA_COMPATIBILITY_UNITS_CARD_CLASS}
        >
          <ExtraCompatibilityUnitsHelpers
            isSubmitting={isSubmitting}
            onClearAll={onClearAll}
            onSelectAll={onSelectAll}
          />
          <ExtraCompatibilityUnitsList
            isSubmitting={isSubmitting}
            onToggleUnit={onToggleUnit}
            options={options}
          />
          <ExtraCompatibilityUnitsActions
            hasChanges={hasChanges}
            isSubmitting={isSubmitting}
            onBack={onBack}
          />
        </div>
      </form>
    </div>
  );
};

export default ExtraCompatibilityUnitsFormView;
