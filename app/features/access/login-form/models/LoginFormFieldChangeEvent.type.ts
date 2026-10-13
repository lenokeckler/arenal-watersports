import type { ChangeEvent } from "react";

export type LoginFormFieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
