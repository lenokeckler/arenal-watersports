import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import {
  EXTRA_COMPATIBILITY_STATE_BODY_CLASS,
  EXTRA_COMPATIBILITY_STATE_TITLE_CLASS,
  EXTRA_COMPATIBILITY_STATE_WRAPPER_CLASS,
} from "../styles/ExtraCompatibility.styles";

const ExtraCompatibilityCategoriesEmptyState =
  (): React.JSX.Element => (
    <div
      className={EXTRA_COMPATIBILITY_STATE_WRAPPER_CLASS}
    >
      <Title
        variant={TitleVariant.AUXILIAR}
        text={
          EXTRA_COMPATIBILITY_COPY.CATEGORIES_EMPTY_TITLE
        }
        className={EXTRA_COMPATIBILITY_STATE_TITLE_CLASS}
      />
      <Text
        className={EXTRA_COMPATIBILITY_STATE_BODY_CLASS}
      >
        {EXTRA_COMPATIBILITY_COPY.CATEGORIES_EMPTY_BODY}
      </Text>
    </div>
  );

export default ExtraCompatibilityCategoriesEmptyState;
