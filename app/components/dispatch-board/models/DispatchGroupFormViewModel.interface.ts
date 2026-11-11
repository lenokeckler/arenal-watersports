import type { ChangeEvent, FormEvent } from "react";

type DispatchFieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export interface DispatchGroupFormViewModel {
  canSubmit: boolean;
  departureTime: string;
  handleDepartureChange: (
    event: DispatchFieldChangeEvent
  ) => void;
  handleReturnChange: (
    event: DispatchFieldChangeEvent
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleToggleUnit: (unitId: string) => void;
  isNextDay: boolean;
  returnTime: string;
  selectedUnitIds: string[];
  targetCount: number;
}
