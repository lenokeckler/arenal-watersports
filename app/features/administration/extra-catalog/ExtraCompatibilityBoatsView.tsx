"use client";

import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  PATHS,
  TitleVariant,
  WIDE_LAYOUT_MARKER_PROPS,
} from "@/app/constants";
import ExtraCompatibilityBoatGroupSection from "./components/ExtraCompatibilityBoatGroupSection";
import ExtraCompatibilityBoatsBar from "./components/ExtraCompatibilityBoatsBar";
import ExtraCompatibilityCategoriesEmptyState from "./components/ExtraCompatibilityCategoriesEmptyState";
import ExtraCompatibilityLeaveSheet from "./components/ExtraCompatibilityLeaveSheet";
import { EXTRA_CATALOG_COPY } from "./constants/ExtraCatalogCopy.constants";
import { EXTRA_COMPATIBILITY_COPY } from "./constants/ExtraCompatibilityCopy.constants";
import { useExtraCompatibilityBoatsViewModel } from "./hooks/useExtraCompatibilityBoatsViewModel";
import type { ExtraCompatibilityCategories } from "./models/ExtraCompatibilityCategories.interface";
import {
  EXTRA_FORM_BACK_ICON_CLASS,
  EXTRA_FORM_BACK_LINK_CLASS,
} from "./styles/ExtraForm.styles";
import {
  EXTRA_BOATS_CONTENT_CLASS,
  EXTRA_BOATS_GROUPS_CLASS,
  EXTRA_BOATS_HEADER_CLASS,
  EXTRA_BOATS_HEADING_CLASS,
  EXTRA_BOATS_OVERLINE_CLASS,
  EXTRA_BOATS_SUBTITLE_CLASS,
  EXTRA_BOATS_TITLE_CLASS,
  EXTRA_BOATS_TOTAL_CLASS,
  EXTRA_BOATS_TOTAL_HELP_CLASS,
  EXTRA_BOATS_TOTAL_ICON_CLASS,
  EXTRA_BOATS_TOTAL_LABEL_CLASS,
  EXTRA_BOATS_TOTAL_TEXT_CLASS,
} from "./styles/ExtraCompatibilityBoats.styles";

const ExtraCompatibilityBoatsView = (
  props: ExtraCompatibilityCategories
): React.JSX.Element => {
  const viewModel =
    useExtraCompatibilityBoatsViewModel(props);

  return (
    <div
      className={EXTRA_BOATS_CONTENT_CLASS}
      {...WIDE_LAYOUT_MARKER_PROPS}
    >
      <div className={EXTRA_BOATS_HEADER_CLASS}>
        <Link
          href={PATHS.ADMINISTRATION.EXTRAS}
          className={EXTRA_FORM_BACK_LINK_CLASS}
        >
          <MaterialIcon
            name={MATERIAL_ICON_NAME.ARROW_BACK}
            className={EXTRA_FORM_BACK_ICON_CLASS}
          />
          <InlineText>
            {EXTRA_CATALOG_COPY.BACK_BUTTON}
          </InlineText>
        </Link>
        <div className={EXTRA_BOATS_HEADING_CLASS}>
          <Text className={EXTRA_BOATS_OVERLINE_CLASS}>
            {EXTRA_COMPATIBILITY_COPY.CATEGORIES_TITLE}
          </Text>
          <Title
            id={ADMINISTRATION_SCREEN_TITLE_ID}
            variant={TitleVariant.PRIMARY}
            text={props.extra.name}
            className={EXTRA_BOATS_TITLE_CLASS}
          />
          <Text className={EXTRA_BOATS_SUBTITLE_CLASS}>
            {EXTRA_COMPATIBILITY_COPY.BOATS_SUBTITLE}
          </Text>
        </div>
      </div>
      {viewModel.groups.length > 0 ? (
        <>
          <div className={EXTRA_BOATS_TOTAL_CLASS}>
            <MaterialIcon
              name={MATERIAL_ICON_NAME.DIRECTIONS_BOAT}
              className={EXTRA_BOATS_TOTAL_ICON_CLASS}
            />
            <div className={EXTRA_BOATS_TOTAL_TEXT_CLASS}>
              <Text
                className={EXTRA_BOATS_TOTAL_LABEL_CLASS}
              >
                {viewModel.totalLabel}
              </Text>
              <Text
                className={EXTRA_BOATS_TOTAL_HELP_CLASS}
              >
                {EXTRA_COMPATIBILITY_COPY.BOATS_TOTAL_HELP}
              </Text>
            </div>
          </div>
          <div className={EXTRA_BOATS_GROUPS_CLASS}>
            {viewModel.groups.map((group) => (
              <ExtraCompatibilityBoatGroupSection
                key={group.id}
                group={group}
                isSubmitting={viewModel.isSubmitting}
              />
            ))}
          </div>
          <ExtraCompatibilityBoatsBar {...viewModel} />
        </>
      ) : (
        <ExtraCompatibilityCategoriesEmptyState />
      )}
      {viewModel.isLeaveSheetOpen ? (
        <ExtraCompatibilityLeaveSheet {...viewModel} />
      ) : null}
    </div>
  );
};

export default ExtraCompatibilityBoatsView;
