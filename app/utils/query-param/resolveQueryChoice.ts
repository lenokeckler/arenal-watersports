import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";

export const resolveQueryChoice = <Choice extends string>(
  value: NullableUndefined<string | string[]>,
  choices: readonly Choice[]
): NullableRef<Choice> =>
  choices.find((choice) => choice === value) ?? null;
