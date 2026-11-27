import ScreenBack from "@/app/components/screen-back/ScreenBack";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ARIA_ROLE,
  TitleVariant,
  PATHS,
} from "@/app/constants";
import UnitPhotosContent from "./components/UnitPhotosContent";
import { UNIT_PHOTOS_COPY } from "./constants/UnitPhotosCopy.constants";
import type { UnitPhotosViewProps } from "./models/UnitPhotosViewProps.interface";
import {
  UNIT_PHOTOS_HEADING_CLASS,
  UNIT_PHOTOS_MESSAGE_CLASS,
  UNIT_PHOTOS_PAGE_CLASS,
} from "./styles/UnitPhotos.styles";
import type { JSX } from "react";

const UnitPhotosView = ({
  data,
  errorMessage,
}: UnitPhotosViewProps): JSX.Element => (
  <main className={UNIT_PHOTOS_PAGE_CLASS}>
    <ScreenBack
      fallbackHref={PATHS.OPERATIONS.UNIT_PHOTOS_ROOT}
    />
    <Title
      variant={TitleVariant.PRIMARY}
      text={UNIT_PHOTOS_COPY.HEADING}
      className={UNIT_PHOTOS_HEADING_CLASS}
    />
    {errorMessage && (
      <Text
        className={UNIT_PHOTOS_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    )}
    {!errorMessage && data && (
      <UnitPhotosContent data={data} />
    )}
  </main>
);

export default UnitPhotosView;
