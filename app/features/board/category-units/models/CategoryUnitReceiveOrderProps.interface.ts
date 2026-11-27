export interface CategoryUnitReceiveOrderProps {
  damageText: string;
  hasDamage: boolean;
  onDamageTextChange: (value: string) => void;
  onHasDamageChange: (hasDamage: boolean) => void;
}
