import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import type { TariffListErrorStateProps } from "../models/TariffListErrorStateProps.interface";
import {
  TARIFF_LIST_BUTTON_CLASS,
  TARIFF_LIST_ERROR_BODY_CLASS,
  TARIFF_LIST_ERROR_WRAPPER_CLASS,
} from "../styles/TariffList.styles";

const TariffListErrorState = ({
  onRetry,
}: TariffListErrorStateProps): React.JSX.Element => (
  <div className={TARIFF_LIST_ERROR_WRAPPER_CLASS}>
    <Text className={TARIFF_LIST_ERROR_BODY_CLASS}>
      {TARIFF_CATALOG_COPY.FETCH_ERROR_MESSAGE}
    </Text>
    <Button
      variant={BUTTON.SECONDARY}
      onClick={onRetry}
      className={TARIFF_LIST_BUTTON_CLASS}
    >
      {TARIFF_CATALOG_COPY.RETRY_BUTTON}
    </Button>
  </div>
);

export default TariffListErrorState;
