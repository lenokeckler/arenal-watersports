import type { ChoicePillsProps } from "./ChoicePillsProps.interface";

export type ChoicePillListProps = Pick<
  ChoicePillsProps,
  "name" | "onChange" | "options" | "value"
>;
