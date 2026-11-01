import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  IMAGE_ALTS,
  STRING,
} from "@/app/constants";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import { UNIT_FORM_FIELD_ID } from "../constants/UnitFormFieldId.constants";
import { UNIT_FORM_TITLE } from "../constants/UnitFormModeCopy.constants";
import type { UnitFormHeaderProps } from "../models/UnitFormHeaderProps.interface";

const UnitFormHeader = ({
  mode,
  categoryName,
}: UnitFormHeaderProps): React.JSX.Element => (
  <ScreenHeading
    title={UNIT_FORM_TITLE[mode]}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    logoAlt={IMAGE_ALTS.COMPANY_LOGO}
    instruction={[
      UNIT_FORM_COPY.CATEGORY_PREFIX,
      categoryName,
      UNIT_FORM_COPY.FORM_HINT,
    ].join(STRING.SPACE)}
    instructionId={UNIT_FORM_FIELD_ID.HINT}
  />
);

export default UnitFormHeader;
