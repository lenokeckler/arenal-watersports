import BackLink from "@/app/components/back-link/BackLink";
import { PATHS } from "@/app/constants";
import ExtraCompatibilityCategoriesEmptyState from "./components/ExtraCompatibilityCategoriesEmptyState";
import ExtraCompatibilityCategoriesHeader from "./components/ExtraCompatibilityCategoriesHeader";
import ExtraCompatibilityCategoryCards from "./components/ExtraCompatibilityCategoryCards";
import { EXTRA_COMPATIBILITY_COPY } from "./constants/ExtraCompatibilityCopy.constants";
import type { ExtraCompatibilityCategories } from "./models/ExtraCompatibilityCategories.interface";
import { EXTRA_COMPATIBILITY_CONTENT_CLASS } from "./styles/ExtraCompatibility.styles";
import { buildExtraCompatibilityCategoryCards } from "./utils/buildExtraCompatibilityCategoryCards";

const ExtraCompatibilityCategoryListView = ({
  categories,
  extra,
}: ExtraCompatibilityCategories): React.JSX.Element => {
  const cards = buildExtraCompatibilityCategoryCards(
    extra.id,
    categories
  );

  return (
    <div className={EXTRA_COMPATIBILITY_CONTENT_CLASS}>
      <ExtraCompatibilityCategoriesHeader
        extraName={extra.name}
      />
      {cards.length > 0 ? (
        <ExtraCompatibilityCategoryCards cards={cards} />
      ) : (
        <ExtraCompatibilityCategoriesEmptyState />
      )}
      <BackLink
        href={PATHS.ADMINISTRATION.EXTRAS}
        label={EXTRA_COMPATIBILITY_COPY.BACK_TO_EXTRAS_LINK}
      />
    </div>
  );
};

export default ExtraCompatibilityCategoryListView;
