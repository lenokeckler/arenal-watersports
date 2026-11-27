import LinkSwitch from "@/app/components/link-switch/LinkSwitch";
import { PATHS, STRING } from "@/app/constants";
import { UNIT_PHOTO_LIST } from "../constants/UnitPhotoList.constants";
import { UNIT_PHOTO_LIST_COPY } from "../constants/UnitPhotoListCopy.constants";
import type { UnitPhotoListContentProps } from "../models/UnitPhotoListContentProps.interface";
import type { JSX } from "react";

const UnitPhotoCategorySwitch = ({
  data,
}: UnitPhotoListContentProps): JSX.Element => (
  <LinkSwitch
    label={UNIT_PHOTO_LIST_COPY.FILTER_LABEL}
    options={[
      { id: null, name: UNIT_PHOTO_LIST_COPY.ALL },
      ...data.categories,
    ].map((category) => ({
      href: PATHS.OPERATIONS.UNIT_PHOTOS_FILTER(
        category.id,
        UNIT_PHOTO_LIST.FIRST_PAGE
      ),
      isCurrent: data.categoryId === category.id,
      key: category.id ?? STRING.Empty,
      label: category.name,
    }))}
  />
);

export default UnitPhotoCategorySwitch;
