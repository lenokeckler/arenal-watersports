"use client";

import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  TitleVariant,
  WIDE_LAYOUT_MARKER_PROPS,
} from "@/app/constants";
import ComboAudienceSection from "./components/ComboAudienceSection";
import ComboListErrorState from "./components/ComboListErrorState";
import ComboRemovalSheet from "./components/ComboRemovalSheet";
import { COMBO_CATALOG_COPY } from "./constants/ComboCatalogCopy.constants";
import { useComboListViewModel } from "./hooks/useComboListViewModel";
import type { ComboListViewProps } from "./models/ComboListViewProps.interface";
import {
  COMBO_LIST_CONTENT_CLASS,
  COMBO_LIST_TITLE_CLASS,
} from "./styles/ComboList.styles";

const ComboListView = ({
  combos,
  fetchFailed,
}: ComboListViewProps): React.JSX.Element => {
  const { onRetry, removalSheet, sections } =
    useComboListViewModel({ combos });

  return (
    <div
      className={COMBO_LIST_CONTENT_CLASS}
      {...WIDE_LAYOUT_MARKER_PROPS}
    >
      <Title
        id={ADMINISTRATION_SCREEN_TITLE_ID}
        variant={TitleVariant.PRIMARY}
        text={COMBO_CATALOG_COPY.LIST_TITLE}
        className={COMBO_LIST_TITLE_CLASS}
      />
      {fetchFailed ? (
        <ComboListErrorState onRetry={onRetry} />
      ) : (
        sections.map((section) => (
          <ComboAudienceSection
            key={section.title}
            {...section}
          />
        ))
      )}
      {removalSheet && (
        <ComboRemovalSheet {...removalSheet} />
      )}
    </div>
  );
};

export default ComboListView;
