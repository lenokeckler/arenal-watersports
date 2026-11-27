import type { NullableRef } from "@/app/types";
import type { ChoicePill } from "./ChoicePill.interface";

export interface ChoicePillsProps {
  error?: NullableRef<string>;
  legend: string;
  name: string;
  onChange: (value: string) => void;
  options: ChoicePill[];
  value: NullableRef<string>;
}
