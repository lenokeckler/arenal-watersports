import UnorderedList from "@/app/components/list/UnorderedList";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import UnitPhotoCard from "./components/UnitPhotoCard";
import { UNIT_PHOTOS_COPY } from "./constants/UnitPhotosCopy.constants";
import type { UnitPhotosViewProps } from "./models/UnitPhotosViewProps.interface";
import {
  UNIT_PHOTOS_HEADING_CLASS,
  UNIT_PHOTOS_IMPACTS_CLASS,
  UNIT_PHOTOS_LIST_CLASS,
  UNIT_PHOTOS_MESSAGE_CLASS,
  UNIT_PHOTOS_PAGE_CLASS,
  UNIT_PHOTOS_UNIT_CLASS,
} from "./styles/UnitPhotos.styles";
import type { JSX } from "react";

const UnitPhotosView = ({
  data,
  errorMessage,
}: UnitPhotosViewProps): JSX.Element => (
  <main className={UNIT_PHOTOS_PAGE_CLASS}>
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
      <>
        <Title
          variant={TitleVariant.SECONDARY}
          text={`${data.unit.code}${UNIT_PHOTOS_COPY.TITLE_SEPARATOR}${data.unit.categoryName}`}
          className={UNIT_PHOTOS_UNIT_CLASS}
        />
        <Text className={UNIT_PHOTOS_IMPACTS_CLASS}>
          {`${UNIT_PHOTOS_COPY.IMPACTS}${data.unit.impactCount}`}
        </Text>
        <UnorderedList
          className={UNIT_PHOTOS_LIST_CLASS}
          items={data.slots.map((slot) => ({
            id: slot.angle,
            text: (
              <UnitPhotoCard
                canManage={data.canManage}
                slot={slot}
                unitId={data.unit.id}
              />
            ),
          }))}
        />
      </>
    )}
  </main>
);

export default UnitPhotosView;
