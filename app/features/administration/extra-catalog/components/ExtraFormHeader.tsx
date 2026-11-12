import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import { ADMINISTRATION_SCREEN_TITLE_ID } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_FIELD_ID } from "../constants/ExtraFormFieldId.constants";
import { EXTRA_FORM_TITLE } from "../constants/ExtraFormModeCopy.constants";
import type { ExtraFormHeaderProps } from "../models/ExtraFormHeaderProps.interface";

const ExtraFormHeader = ({
  mode,
}: ExtraFormHeaderProps): React.JSX.Element => (
  <ScreenHeading
    title={EXTRA_FORM_TITLE[mode]}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    hasLogo={false}
    instruction={EXTRA_CATALOG_COPY.FORM_PURPOSE}
    instructionId={EXTRA_FORM_FIELD_ID.HINT}
  />
);

export default ExtraFormHeader;
