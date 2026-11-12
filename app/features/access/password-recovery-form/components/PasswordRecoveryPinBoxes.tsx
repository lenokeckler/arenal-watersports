import { InlineText } from "@/app/components";
import {
  PASSWORD_RECOVERY_PIN_BOX_POSITIONS,
  PASSWORD_RECOVERY_PIN_BOXES_TEST_ID,
} from "../constants/PasswordRecoveryPinBoxes.constants";
import type { PasswordRecoveryPinBoxesProps } from "../models/PasswordRecoveryPinBoxesProps.interface";
import {
  PASSWORD_RECOVERY_PIN_BOXES_CLASS,
  resolvePasswordRecoveryPinBoxClassName,
} from "../styles/PasswordRecoveryForm.styles";

const PasswordRecoveryPinBoxes = ({
  hasError,
  value,
}: PasswordRecoveryPinBoxesProps): React.JSX.Element => (
  <div
    aria-hidden="true"
    data-testid={PASSWORD_RECOVERY_PIN_BOXES_TEST_ID}
    className={PASSWORD_RECOVERY_PIN_BOXES_CLASS}
  >
    {PASSWORD_RECOVERY_PIN_BOX_POSITIONS.map((position) => (
      <InlineText
        key={position}
        className={resolvePasswordRecoveryPinBoxClassName({
          hasError,
          isFilled: position < value.length,
          isNext: position === value.length,
        })}
      >
        {value.charAt(position)}
      </InlineText>
    ))}
  </div>
);

export default PasswordRecoveryPinBoxes;
