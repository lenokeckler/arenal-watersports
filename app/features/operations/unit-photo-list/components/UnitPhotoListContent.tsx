import ListPagination from "@/app/components/list-pagination/ListPagination";
import { PATHS } from "@/app/constants";
import { resolveCardGridSize } from "@/app/utils/card-grid/resolveCardGridSize";
import { UNIT_PHOTO_LIST_COPY } from "../constants/UnitPhotoListCopy.constants";
import type { UnitPhotoListContentProps } from "../models/UnitPhotoListContentProps.interface";
import { UNIT_PHOTO_LIST_GRID_CLASS } from "../styles/UnitPhotoList.styles";
import UnitPhotoCategorySwitch from "./UnitPhotoCategorySwitch";
import UnitPhotoListCard from "./UnitPhotoListCard";
import type { JSX } from "react";

const UnitPhotoListContent = ({
  data,
}: UnitPhotoListContentProps): JSX.Element => {
  const size = resolveCardGridSize(
    data.items.length,
    data.pageCount > 1
  );

  return (
    <>
      <UnitPhotoCategorySwitch data={data} />
      <div className={UNIT_PHOTO_LIST_GRID_CLASS}>
        {data.items.map((item) => (
          <UnitPhotoListCard
            key={item.id}
            item={item}
            size={size}
          />
        ))}
      </div>
      <ListPagination
        basePath={PATHS.OPERATIONS.UNIT_PHOTOS_ROOT}
        currentPage={data.page}
        navLabel={UNIT_PHOTO_LIST_COPY.PAGES_LABEL}
        pageCount={data.pageCount}
        pageHref={(page) =>
          PATHS.OPERATIONS.UNIT_PHOTOS_FILTER(
            data.categoryId,
            page
          )
        }
      />
    </>
  );
};

export default UnitPhotoListContent;
