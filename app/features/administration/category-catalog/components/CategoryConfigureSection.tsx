import Button from "@/app/components/button/Button";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import Title from "@/app/components/title/Title";
import { BUTTON, TitleVariant } from "@/app/constants";
import type { CategoryConfigureSectionProps } from "../models/CategoryConfigureSectionProps.interface";
import {
  CATEGORY_CONFIGURE_SECTION_CLASS,
  CATEGORY_CONFIGURE_SECTION_HEADER_CLASS,
  CATEGORY_CONFIGURE_SECTION_HEADING_CLASS,
  CATEGORY_CONFIGURE_SECTION_PANEL_CLASS,
  CATEGORY_CONFIGURE_SECTION_SUMMARY_CLASS,
  CATEGORY_CONFIGURE_SECTION_TEXT_CLASS,
  CATEGORY_CONFIGURE_SECTION_TITLE_CLASS,
  resolveCategoryConfigureSectionChevronClassName,
} from "../styles/CategoryConfigureSection.styles";
import { resolveCategoryConfigurePanelId } from "../utils/resolveCategoryConfigurePanelId";
import { resolveCategoryConfigureSectionAnchorId } from "../utils/resolveCategoryConfigureSectionAnchorId";
import CategoryConfigureChip from "./CategoryConfigureChip";

const CategoryConfigureSection = ({
  id,
  title,
  summary,
  badge,
  isOpen,
  onToggle,
  children,
}: CategoryConfigureSectionProps): React.JSX.Element => {
  const panelId = resolveCategoryConfigurePanelId(id);

  return (
    <div
      id={resolveCategoryConfigureSectionAnchorId(id)}
      className={CATEGORY_CONFIGURE_SECTION_CLASS}
    >
      <Title
        variant={TitleVariant.AUXILIAR}
        text={title}
        className={CATEGORY_CONFIGURE_SECTION_HEADING_CLASS}
      >
        <Button
          variant={BUTTON.BASE}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(id)}
          className={
            CATEGORY_CONFIGURE_SECTION_HEADER_CLASS
          }
        >
          <div
            className={
              CATEGORY_CONFIGURE_SECTION_TEXT_CLASS
            }
          >
            <InlineText
              className={
                CATEGORY_CONFIGURE_SECTION_TITLE_CLASS
              }
            >
              {title}
            </InlineText>
            <InlineText
              className={
                CATEGORY_CONFIGURE_SECTION_SUMMARY_CLASS
              }
            >
              {summary}
            </InlineText>
          </div>
          {badge && <CategoryConfigureChip {...badge} />}
          <MaterialIcon
            name={MATERIAL_ICON_NAME.EXPAND_MORE}
            className={resolveCategoryConfigureSectionChevronClassName(
              isOpen
            )}
          />
        </Button>
      </Title>
      {isOpen && (
        <div
          id={panelId}
          className={CATEGORY_CONFIGURE_SECTION_PANEL_CLASS}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CategoryConfigureSection;
