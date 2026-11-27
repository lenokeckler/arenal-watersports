import type { CategoryConfigureNextStepProps } from "./CategoryConfigureNextStepProps.interface";

export interface CategoryConfigureNextStepsProps {
  title: string;
  progress: string;
  body: string;
  steps: CategoryConfigureNextStepProps[];
}
