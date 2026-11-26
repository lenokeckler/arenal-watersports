"use client";

import { WIDE_LAYOUT_MARKER_PROPS } from "@/app/constants";
import ComboAudienceSection from "./components/ComboAudienceSection";
import ComboListErrorState from "./components/ComboListErrorState";
import ComboListHeader from "./components/ComboListHeader";
import ComboRemovalSheet from "./components/ComboRemovalSheet";
import { useComboListViewModel } from "./hooks/useComboListViewModel";
import type { ComboListViewProps } from "./models/ComboListViewProps.interface";
import { COMBO_LIST_CONTENT_CLASS } from "./styles/ComboList.styles";

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
      <ComboListHeader />
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
