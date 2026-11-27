import type { PriceLookupNames } from "./PriceLookupNames.interface";

export interface PriceLookupFixture {
  names: PriceLookupNames;
  remove: () => Promise<void>;
}
