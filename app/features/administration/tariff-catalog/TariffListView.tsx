"use client";

import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  TitleVariant,
  WIDE_LAYOUT_MARKER_PROPS,
} from "@/app/constants";
import TariffListBody from "./components/TariffListBody";
import { TARIFF_CATALOG_COPY } from "./constants/TariffCatalogCopy.constants";
import { useTariffListViewModel } from "./hooks/useTariffListViewModel";
import type { TariffListViewProps } from "./models/TariffListViewProps.interface";
import {
  TARIFF_LIST_CONTENT_CLASS,
  TARIFF_LIST_TITLE_CLASS,
} from "./styles/TariffList.styles";

const TariffListView = ({
  categories,
  fetchFailed,
}: TariffListViewProps): React.JSX.Element => {
  const { cards, onRetry } = useTariffListViewModel({
    categories,
  });

  return (
    <div
      className={TARIFF_LIST_CONTENT_CLASS}
      {...WIDE_LAYOUT_MARKER_PROPS}
    >
      <Title
        id={ADMINISTRATION_SCREEN_TITLE_ID}
        variant={TitleVariant.PRIMARY}
        text={TARIFF_CATALOG_COPY.LIST_TITLE}
        className={TARIFF_LIST_TITLE_CLASS}
      />
      <TariffListBody
        cards={cards}
        fetchFailed={fetchFailed}
        onRetry={onRetry}
      />
    </div>
  );
};

export default TariffListView;
