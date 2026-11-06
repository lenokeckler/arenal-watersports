import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { PersonalEmailFocusField } from "./PersonalEmailFocusField.type";

export type PersonalEmailFieldRefs = Record<
  PersonalEmailFocusField,
  RefObject<NullableRef<HTMLInputElement>>
>;
