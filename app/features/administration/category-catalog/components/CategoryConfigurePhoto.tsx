import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryConfigurePhotoProps } from "../models/CategoryConfigurePhotoProps.interface";
import {
  CATEGORY_CONFIGURE_BODY_CLASS,
  CATEGORY_CONFIGURE_BODY_HELP_CLASS,
} from "../styles/CategoryConfigureBody.styles";
import { CATEGORY_IMAGE_ERROR_CLASS } from "../styles/CategoryImage.styles";
import CategoryConfigurePhotoPicker from "./CategoryConfigurePhotoPicker";
import CategoryConfigurePhotoPreview from "./CategoryConfigurePhotoPreview";

const CategoryConfigurePhoto = ({
  errorMessage,
  formState,
  previewUrl,
  onPickFile,
}: CategoryConfigurePhotoProps): React.JSX.Element => (
  <div className={CATEGORY_CONFIGURE_BODY_CLASS}>
    <CategoryConfigurePhotoPreview
      formState={formState}
      previewUrl={previewUrl}
    />
    {errorMessage && (
      <Text
        role={ARIA_ROLE.ALERT}
        className={CATEGORY_IMAGE_ERROR_CLASS}
      >
        {errorMessage}
      </Text>
    )}
    <CategoryConfigurePhotoPicker onPickFile={onPickFile} />
    <Text className={CATEGORY_CONFIGURE_BODY_HELP_CLASS}>
      {CATEGORY_CONFIGURE_COPY.PHOTO_HELP}
    </Text>
  </div>
);

export default CategoryConfigurePhoto;
