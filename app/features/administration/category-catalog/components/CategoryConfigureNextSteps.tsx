import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import type { CategoryConfigureNextStepsProps } from "../models/CategoryConfigureNextStepsProps.interface";
import {
  CATEGORY_CONFIGURE_NEXT_STEPS_BODY_CLASS,
  CATEGORY_CONFIGURE_NEXT_STEPS_CLASS,
  CATEGORY_CONFIGURE_NEXT_STEPS_HEADER_CLASS,
  CATEGORY_CONFIGURE_NEXT_STEPS_PROGRESS_CLASS,
  CATEGORY_CONFIGURE_NEXT_STEPS_TITLE_CLASS,
} from "../styles/CategoryConfigureNextSteps.styles";
import CategoryConfigureNextStep from "./CategoryConfigureNextStep";

const CategoryConfigureNextSteps = ({
  title,
  progress,
  body,
  steps,
}: CategoryConfigureNextStepsProps): React.JSX.Element => (
  <Section className={CATEGORY_CONFIGURE_NEXT_STEPS_CLASS}>
    <div
      className={CATEGORY_CONFIGURE_NEXT_STEPS_HEADER_CLASS}
    >
      <Title
        variant={TitleVariant.SECONDARY}
        text={title}
        className={
          CATEGORY_CONFIGURE_NEXT_STEPS_TITLE_CLASS
        }
      />
      <Text
        className={
          CATEGORY_CONFIGURE_NEXT_STEPS_PROGRESS_CLASS
        }
      >
        {progress}
      </Text>
    </div>
    <Text
      className={CATEGORY_CONFIGURE_NEXT_STEPS_BODY_CLASS}
    >
      {body}
    </Text>
    {steps.map((step) => (
      <CategoryConfigureNextStep
        key={step.id}
        {...step}
      />
    ))}
  </Section>
);

export default CategoryConfigureNextSteps;
