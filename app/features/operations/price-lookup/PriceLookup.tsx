import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import PriceLookupView from "./PriceLookupView";
import { PRICE_LOOKUP_COPY } from "./constants/PriceLookupCopy.constants";
import { EMPTY_PRICE_LOOKUP_CATALOG } from "./constants/PriceLookupEmptyCatalog.constants";
import type { PriceLookupCatalog } from "./models/PriceLookupCatalog.interface";
import { getPriceLookupCatalog } from "./services/getPriceLookupCatalog";
import { buildPriceLookupScreen } from "./utils/buildPriceLookupScreen";
import type { JSX } from "react";

const PriceLookup = async (): Promise<JSX.Element> => {
  let catalog: PriceLookupCatalog =
    EMPTY_PRICE_LOOKUP_CATALOG;
  let errorMessage: NullableRef<string> = null;

  try {
    catalog = await getPriceLookupCatalog();
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? PRICE_LOOKUP_COPY.FORBIDDEN
        : PRICE_LOOKUP_COPY.ERROR;
  }

  return (
    <PriceLookupView
      errorMessage={errorMessage}
      screen={buildPriceLookupScreen(catalog)}
    />
  );
};

export default PriceLookup;
