import type { PersonalEmailFieldChangeEvent } from "../models/PersonalEmailFieldChangeEvent.type";

export const createChangeEvent = (
  name: string,
  value: string
): PersonalEmailFieldChangeEvent =>
  ({
    target: { name, value },
  }) as PersonalEmailFieldChangeEvent;
