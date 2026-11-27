import ScreenBack from "@/app/components/screen-back/ScreenBack";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import UnitPhotoListContent from "./components/UnitPhotoListContent";
import { UNIT_PHOTO_LIST_COPY } from "./constants/UnitPhotoListCopy.constants";
import type { UnitPhotoListViewProps } from "./models/UnitPhotoListViewProps.interface";
import {
  UNIT_PHOTO_LIST_CLASS,
  UNIT_PHOTO_LIST_HEADING_CLASS,
  UNIT_PHOTO_LIST_MESSAGE_CLASS,
} from "./styles/UnitPhotoList.styles";
import type { JSX } from "react";

const UnitPhotoListView = ({
  data,
  errorMessage,
}: UnitPhotoListViewProps): JSX.Element => (
  <main className={UNIT_PHOTO_LIST_CLASS}>
    <ScreenBack fallbackHref={PATHS.OPERATIONS.EQUIPMENT} />
    <Title
      variant={TitleVariant.PRIMARY}
      text={UNIT_PHOTO_LIST_COPY.HEADING}
      className={UNIT_PHOTO_LIST_HEADING_CLASS}
    />
    {!data && (
      <Text
        className={UNIT_PHOTO_LIST_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    )}
    {data && data.items.length === 0 && (
      <Text className={UNIT_PHOTO_LIST_MESSAGE_CLASS}>
        {UNIT_PHOTO_LIST_COPY.EMPTY}
      </Text>
    )}
    {data && data.items.length > 0 && (
      <UnitPhotoListContent data={data} />
    )}
  </main>
);

export default UnitPhotoListView;
