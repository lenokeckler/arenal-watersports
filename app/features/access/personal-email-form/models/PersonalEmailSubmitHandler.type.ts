import type { PersonalEmailSubmitEvent } from "./PersonalEmailSubmitEvent.type";

export type PersonalEmailSubmitHandler = (
  event: PersonalEmailSubmitEvent
) => void;
