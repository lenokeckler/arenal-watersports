import type { CategoryConfigureSectionListProps } from "../models/CategoryConfigureSectionListProps.interface";
import CategoryConfigureSection from "./CategoryConfigureSection";
import CategoryConfigureSectionBody from "./CategoryConfigureSectionBody";

const CategoryConfigureSectionList = ({
  categoryId,
  trackingMode,
  sections,
  onToggleSection,
}: CategoryConfigureSectionListProps): React.JSX.Element => (
  <>
    {sections.map((section) => (
      <CategoryConfigureSection
        key={section.id}
        {...section}
        onToggle={onToggleSection}
      >
        <CategoryConfigureSectionBody
          sectionId={section.id}
          categoryId={categoryId}
          trackingMode={trackingMode}
        />
      </CategoryConfigureSection>
    ))}
  </>
);

export default CategoryConfigureSectionList;
