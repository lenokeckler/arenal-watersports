import type { NullableRef } from "@/app/types";
import type { PriceLookupScreen } from "./PriceLookupScreen.interface";

export interface PriceLookupViewProps {
  errorMessage: NullableRef<string>;
  screen: PriceLookupScreen;
}
