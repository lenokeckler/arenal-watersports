import type { ChangeEvent } from "react";

export type DamageReportFieldChangeHandler = (
  event: ChangeEvent<
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
  >
) => void;
