import type { PersonalEmailFieldChangeEvent } from "./PersonalEmailFieldChangeEvent.type";

export type PersonalEmailFieldChangeHandler = (
  event: PersonalEmailFieldChangeEvent
) => void;
