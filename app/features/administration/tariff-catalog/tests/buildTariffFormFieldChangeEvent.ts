import type { TariffFormFieldChangeEvent } from "../models/TariffFormFieldChangeEvent.type";

export const buildTariffFormFieldChangeEvent = (
  target: Partial<HTMLInputElement>
): TariffFormFieldChangeEvent =>
  ({ target }) as TariffFormFieldChangeEvent;
