import UnorderedList from "@/app/components/list/UnorderedList";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import type { PriceLookupGroupProps } from "../models/PriceLookupGroupProps.interface";
import {
  PRICE_LOOKUP_GROUP_CLASS,
  PRICE_LOOKUP_GROUP_HEADING_CLASS,
  PRICE_LOOKUP_GROUP_LIST_CLASS,
  PRICE_LOOKUP_MESSAGE_CLASS,
} from "../styles/PriceLookup.styles";
import PriceLookupRowItem from "./PriceLookupRowItem";
import type { JSX } from "react";

const PriceLookupGroup = ({
  emptyMessage,
  headingId,
  rows,
  title,
}: PriceLookupGroupProps): JSX.Element => (
  <div className={PRICE_LOOKUP_GROUP_CLASS}>
    <Title
      id={headingId}
      variant={TitleVariant.AUXILIAR}
      text={title}
      className={PRICE_LOOKUP_GROUP_HEADING_CLASS}
    />
    {rows.length === 0 && (
      <Text className={PRICE_LOOKUP_MESSAGE_CLASS}>
        {emptyMessage}
      </Text>
    )}
    {rows.length > 0 && (
      <UnorderedList
        aria-labelledby={headingId}
        className={PRICE_LOOKUP_GROUP_LIST_CLASS}
        items={rows.map((row) => ({
          id: row.id,
          text: <PriceLookupRowItem row={row} />,
        }))}
      />
    )}
  </div>
);

export default PriceLookupGroup;
