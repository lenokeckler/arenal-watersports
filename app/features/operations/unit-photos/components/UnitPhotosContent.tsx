import UnorderedList from "@/app/components/list/UnorderedList";
import { UNORDERED_LIST } from "@/app/components/list/UnorderedList.constants";
import type { UnitPhotosContentProps } from "../models/UnitPhotosContentProps.interface";
import { UNIT_PHOTOS_LIST_CLASS } from "../styles/UnitPhotos.styles";
import UnitPhotoCard from "./UnitPhotoCard";
import UnitPhotosActions from "./UnitPhotosActions";
import UnitPhotosSummary from "./UnitPhotosSummary";
import type { JSX } from "react";

const UnitPhotosContent = ({
  data,
}: UnitPhotosContentProps): JSX.Element => (
  <>
    <UnitPhotosSummary data={data} />
    <UnorderedList
      variant={UNORDERED_LIST.VARIANTS.PLAIN}
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
    <UnitPhotosActions unitId={data.unit.id} />
  </>
);

export default UnitPhotosContent;
