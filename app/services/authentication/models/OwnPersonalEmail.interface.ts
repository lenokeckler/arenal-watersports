import type { NullableRef } from "@/app/types";

export interface OwnPersonalEmail {
  address: NullableRef<string>;
  isRequired: boolean;
}
