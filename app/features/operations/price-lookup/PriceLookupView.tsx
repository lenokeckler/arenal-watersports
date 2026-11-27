import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import PriceLookupContent from "./components/PriceLookupContent";
import { PRICE_LOOKUP_COPY } from "./constants/PriceLookupCopy.constants";
import { PRICE_LOOKUP_HEADING_ID } from "./constants/PriceLookupHeadingId.constants";
import type { PriceLookupViewProps } from "./models/PriceLookupViewProps.interface";
import {
  PRICE_LOOKUP_CLASS,
  PRICE_LOOKUP_HEADING_CLASS,
  PRICE_LOOKUP_MESSAGE_CLASS,
} from "./styles/PriceLookup.styles";
import type { JSX } from "react";

const PriceLookupView = ({
  errorMessage,
  screen,
}: PriceLookupViewProps): JSX.Element => (
  <main className={PRICE_LOOKUP_CLASS}>
    <Title
      id={PRICE_LOOKUP_HEADING_ID.PAGE}
      variant={TitleVariant.PRIMARY}
      text={PRICE_LOOKUP_COPY.HEADING}
      className={PRICE_LOOKUP_HEADING_CLASS}
    />
    {errorMessage && (
      <Text
        className={PRICE_LOOKUP_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    )}
    {!errorMessage && screen.isEmpty && (
      <Text className={PRICE_LOOKUP_MESSAGE_CLASS}>
        {PRICE_LOOKUP_COPY.EMPTY}
      </Text>
    )}
    {!errorMessage && !screen.isEmpty && (
      <PriceLookupContent screen={screen} />
    )}
  </main>
);

export default PriceLookupView;
