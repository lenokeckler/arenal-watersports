import type { NullableRef } from "@/app/types";

export interface LinkSelectProps {
  allHref: string;
  allLabel: string;
  id: string;
  label: string;
  options: { href: string; id: string; label: string }[];
  value: NullableRef<string>;
}
