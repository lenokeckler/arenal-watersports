import { Text } from "@/app/components";
import { FORM_GROUP_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import ScreenHeader from "./ScreenHeader";
import type { ScreenHeadingProps } from "./models/ScreenHeadingProps.interface";
import { SCREEN_INSTRUCTION_CLASS } from "./styles/ScreenHeader.styles";

const ScreenHeading = ({
  instruction,
  instructionId,
  ...headerProps
}: ScreenHeadingProps): React.JSX.Element => (
  <div className={FORM_GROUP_CLASS}>
    <ScreenHeader {...headerProps} />
    <Text
      id={instructionId}
      className={SCREEN_INSTRUCTION_CLASS}
    >
      {instruction}
    </Text>
  </div>
);

export default ScreenHeading;
