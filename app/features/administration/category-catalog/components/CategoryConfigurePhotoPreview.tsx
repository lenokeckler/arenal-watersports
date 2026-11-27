import Image from "@/app/components/image/Image";
import Text from "@/app/components/text/Text";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import {
  CATEGORY_IMAGE_PREVIEW_ALT,
  CATEGORY_IMAGE_PREVIEW_SIZES,
} from "../constants/CategoryImageView.constants";
import type { CategoryImagePreviewProps } from "../models/CategoryImagePreviewProps.interface";
import {
  CATEGORY_IMAGE_PREVIEW_EMPTY_CLASS,
  CATEGORY_IMAGE_PREVIEW_FRAME_CLASS,
  CATEGORY_IMAGE_PREVIEW_IMAGE_CLASS,
} from "../styles/CategoryImage.styles";

const CategoryConfigurePhotoPreview = ({
  formState,
  previewUrl,
}: CategoryImagePreviewProps): React.JSX.Element => (
  <div className={CATEGORY_IMAGE_PREVIEW_FRAME_CLASS}>
    {previewUrl ? (
      <Image
        src={previewUrl}
        alt={CATEGORY_IMAGE_PREVIEW_ALT[formState]}
        aria-hidden={false}
        fill
        sizes={CATEGORY_IMAGE_PREVIEW_SIZES}
        className={CATEGORY_IMAGE_PREVIEW_IMAGE_CLASS}
      />
    ) : (
      <Text className={CATEGORY_IMAGE_PREVIEW_EMPTY_CLASS}>
        {CATEGORY_CONFIGURE_COPY.PHOTO_EMPTY}
      </Text>
    )}
  </div>
);

export default CategoryConfigurePhotoPreview;
