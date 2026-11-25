export interface CountStepperProps {
  label: string;
  lessLabel: string;
  max: number;
  min: number;
  moreLabel: string;
  onChange: (value: number) => void;
  value: number;
}
