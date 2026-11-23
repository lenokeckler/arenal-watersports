"use client";

import CategoryConfigureDelete from "./components/CategoryConfigureDelete";
import CategoryConfigureHeader from "./components/CategoryConfigureHeader";
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
    sections,
    bodies,
    deletion,
    onToggleSection,
  } = useCategoryConfigureViewModel({ configuration });

  return (
    <div className={CATEGORY_LIST_CONTENT_CLASS}>
      <CategoryConfigureHeader name={name} />
      <CategoryConfigureStatusCard {...statusCard} />
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
    </div>
  );
};

export default CategoryConfigureView;
