import type { NullableRef } from "@/app/types";
import type { AttributeExemption } from "./AttributeExemption.interface";

export const listAttributeValuesHoldingText = (
  container: Element,
  text: string,
  exempt: NullableRef<AttributeExemption> = null
): string[] =>
  Array.from(container.querySelectorAll("*")).flatMap(
    (element) =>
      Array.from(element.attributes)
        .filter(
          ({ name }) =>
            element !== exempt?.element ||
            name !== exempt.attribute
        )
        .map(({ value }) => value)
        .filter((value) => value.includes(text))
  );
