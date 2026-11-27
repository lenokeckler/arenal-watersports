import type { Metadata } from "next";
import { PAGINATION } from "@/app/constants";
import UnitPhotoList from "@/app/features/operations/unit-photo-list/UnitPhotoList";
import { UNIT_PHOTO_LIST_COPY } from "@/app/features/operations/unit-photo-list/constants/UnitPhotoListCopy.constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: UNIT_PHOTO_LIST_COPY.HEADING,
};

const OperationsUnitPhotoListPage = async ({
  searchParams,
}: PageProps<"/operations/unit-photos">): Promise<JSX.Element> => {
  const params = await searchParams;

  return (
    <UnitPhotoList
      categoryParam={params.category}
      pageParam={params[PAGINATION.QUERY_PARAMS.PAGE]}
    />
  );
};

export default OperationsUnitPhotoListPage;
