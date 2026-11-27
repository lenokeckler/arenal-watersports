"use client";

import CategoryConfigureDelete from "./components/CategoryConfigureDelete";
import CategoryConfigureNextSteps from "./components/CategoryConfigureNextSteps";
import CategoryConfigureLeaveSheet from "./components/CategoryConfigureLeaveSheet";
import CategoryConfigureHeader from "./components/CategoryConfigureHeader";
import CategoryConfigureSaveBar from "./components/CategoryConfigureSaveBar";
import CategoryConfigureSectionList from "./components/CategoryConfigureSectionList";
import CategoryConfigureStatusCard from "./components/CategoryConfigureStatusCard";
import { useCategoryConfigureViewModel } from "./hooks/useCategoryConfigureViewModel";
import type { CategoryConfigureViewProps } from "./models/CategoryConfigureViewProps.interface";
import { CATEGORY_LIST_CONTENT_CLASS } from "./styles/CategoryList.styles";

const CategoryConfigureView = ({
  configuration,
}: CategoryConfigureViewProps): React.JSX.Element => {
  const {
    name,
    statusCard,
    nextSteps,
    sections,
    bodies,
    deletion,
    leave,
    saveBar,
    onToggleSection,
  } = useCategoryConfigureViewModel({ configuration });

  return (
    <div className={CATEGORY_LIST_CONTENT_CLASS}>
      <CategoryConfigureHeader
        name={name}
        hasUnsavedChanges={leave.hasUnsavedChanges}
        onRequestLeave={leave.onRequestLeave}
      />
      <CategoryConfigureStatusCard {...statusCard} />
      {nextSteps && (
        <CategoryConfigureNextSteps {...nextSteps} />
      )}
      <CategoryConfigureSectionList
        categoryId={configuration.id}
        trackingMode={configuration.behavior.trackingMode}
        sections={sections}
        bodies={bodies}
        onToggleSection={onToggleSection}
      />
      {deletion && (
        <CategoryConfigureDelete {...deletion} />
      )}
      <CategoryConfigureSaveBar {...saveBar} />
      {leave.sheet && (
        <CategoryConfigureLeaveSheet {...leave.sheet} />
      )}
    </div>
  );
};

export default CategoryConfigureView;
