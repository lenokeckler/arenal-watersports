"use client";

import BackLink from "@/app/components/back-link/BackLink";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  PATHS,
  TitleVariant,
  WIDE_LAYOUT_MARKER_PROPS,
} from "@/app/constants";
import TariffListBody from "./components/TariffListBody";
import TariffListFilters from "./components/TariffListFilters";
import { TARIFF_CATALOG_COPY } from "./constants/TariffCatalogCopy.constants";
import { useTariffListViewModel } from "./hooks/useTariffListViewModel";
import type { TariffListViewProps } from "./models/TariffListViewProps.interface";
import {
  TARIFF_LIST_CONTENT_CLASS,
  TARIFF_LIST_HEADER_CLASS,
  TARIFF_LIST_SUBTITLE_CLASS,
  TARIFF_LIST_TITLE_CLASS,
} from "./styles/TariffList.styles";

const TariffListView = ({
  categories,
  fetchFailed,
}: TariffListViewProps): React.JSX.Element => {
  const viewModel = useTariffListViewModel({
    categories,
  });

  return (
    <div
      className={TARIFF_LIST_CONTENT_CLASS}
      {...WIDE_LAYOUT_MARKER_PROPS}
    >
      <div className={TARIFF_LIST_HEADER_CLASS}>
        <Title
          id={ADMINISTRATION_SCREEN_TITLE_ID}
          variant={TitleVariant.PRIMARY}
          text={TARIFF_CATALOG_COPY.LIST_TITLE}
          className={TARIFF_LIST_TITLE_CLASS}
        />
        <Text className={TARIFF_LIST_SUBTITLE_CLASS}>
          {TARIFF_CATALOG_COPY.LIST_SUBTITLE}
        </Text>
      </div>
      <TariffListFilters
        options={viewModel.filterOptions}
        onSelect={viewModel.onFilterSelect}
      />
      <TariffListBody
        cards={viewModel.cards}
        emptyMessage={viewModel.emptyMessage}
        fetchFailed={fetchFailed}
        onRetry={viewModel.onRetry}
      />
      <BackLink
        href={PATHS.HOME}
        label={TARIFF_CATALOG_COPY.BACK_TO_HOME}
      />
    </div>
  );
};

export default TariffListView;
