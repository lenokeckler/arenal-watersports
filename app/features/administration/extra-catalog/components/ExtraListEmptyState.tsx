import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import {
  EXTRA_LIST_STATE_BODY_CLASS,
  EXTRA_LIST_STATE_TITLE_CLASS,
  EXTRA_LIST_STATE_WRAPPER_CLASS,
} from "../styles/ExtraListStates.styles";

const ExtraListEmptyState = (): React.JSX.Element => (
  <div className={EXTRA_LIST_STATE_WRAPPER_CLASS}>
    <Title
      variant={TitleVariant.AUXILIAR}
      text={EXTRA_CATALOG_COPY.EMPTY_STATE_TITLE}
      className={EXTRA_LIST_STATE_TITLE_CLASS}
    />
    <Text className={EXTRA_LIST_STATE_BODY_CLASS}>
      {EXTRA_CATALOG_COPY.EMPTY_STATE_BODY}
    </Text>
  </div>
);

export default ExtraListEmptyState;
