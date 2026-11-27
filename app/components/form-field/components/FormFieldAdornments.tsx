import InlineText from "../../text/InlineText";
import type { FormFieldAdornmentsProps } from "../models/FormFieldAdornmentsProps.interface";
import {
  FORM_FIELD_ADORNED_CLASS,
  FORM_FIELD_END_ADORNMENT_CLASS,
  FORM_FIELD_START_ADORNMENT_CLASS,
} from "../styles/FormField.styles";

const FormFieldAdornments = ({
  children,
  endAdornment,
  startAdornment,
}: FormFieldAdornmentsProps): React.JSX.Element => {
  if (!startAdornment && !endAdornment) {
    return <>{children}</>;
  }

  return (
    <div className={FORM_FIELD_ADORNED_CLASS}>
      {startAdornment ? (
        <InlineText
          aria-hidden="true"
          className={FORM_FIELD_START_ADORNMENT_CLASS}
        >
          {startAdornment}
        </InlineText>
      ) : null}
      {children}
      {endAdornment ? (
        <InlineText
          aria-hidden="true"
          className={FORM_FIELD_END_ADORNMENT_CLASS}
        >
          {endAdornment}
        </InlineText>
      ) : null}
    </div>
  );
};

export default FormFieldAdornments;
