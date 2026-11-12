import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import { ADMINISTRATION_SCREEN_TITLE_ID } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { CATEGORY_IMAGE_FORM_FIELD_ID } from "../constants/CategoryImageFormFieldId.constants";

const CategoryImageFormHeader = (): React.JSX.Element => (
  <ScreenHeading
    title={CATEGORY_IMAGE_COPY.FORM_TITLE}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    hasLogo={false}
    instruction={CATEGORY_IMAGE_COPY.FORM_HINT}
    instructionId={CATEGORY_IMAGE_FORM_FIELD_ID.HINT}
  />
);

export default CategoryImageFormHeader;
