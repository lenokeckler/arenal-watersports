import type { ChangeEvent } from "react";

export type PersonalEmailFieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
