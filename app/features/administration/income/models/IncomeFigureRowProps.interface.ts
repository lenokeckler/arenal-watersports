import type { Money } from "@/app/utils/money/models/Money.interface";

export interface IncomeFigureRowProps {
  label: string;
  money: Money;
  hasSignGlyph?: boolean;
}
