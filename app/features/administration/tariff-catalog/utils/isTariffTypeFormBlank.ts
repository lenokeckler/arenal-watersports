import { STRING } from "@/app/constants";
import type { TariffTypeFormValues } from "../models/TariffTypeFormValues.interface";

export const isTariffTypeFormBlank = ({
  crcText,
  usdText,
}: TariffTypeFormValues): boolean =>
  crcText.trim() === STRING.Empty &&
  usdText.trim() === STRING.Empty;
