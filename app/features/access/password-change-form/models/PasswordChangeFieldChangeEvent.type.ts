import type { ChangeEvent } from "react";

export type PasswordChangeFieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
