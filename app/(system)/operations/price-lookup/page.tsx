import type { Metadata } from "next";
import PriceLookup from "@/app/features/operations/price-lookup/PriceLookup";
import { PRICE_LOOKUP_METADATA } from "@/app/features/operations/price-lookup/constants/PriceLookupMetadata.constants";
import type { JSX } from "react";

export const metadata: Metadata = PRICE_LOOKUP_METADATA;

const OperationsPriceLookupPage = (): JSX.Element => (
  <PriceLookup />
);

export default OperationsPriceLookupPage;
