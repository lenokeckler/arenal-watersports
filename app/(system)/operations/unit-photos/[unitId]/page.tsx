import type { Metadata } from "next";
import UnitPhotos from "@/app/features/operations/unit-photos/UnitPhotos";
import { UNIT_PHOTOS_COPY } from "@/app/features/operations/unit-photos/constants/UnitPhotosCopy.constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: UNIT_PHOTOS_COPY.HEADING,
};

const OperationsUnitPhotosPage = async ({
  params,
}: PageProps<"/operations/unit-photos/[unitId]">): Promise<JSX.Element> => {
  const { unitId } = await params;

  return <UnitPhotos unitId={unitId} />;
};

export default OperationsUnitPhotosPage;
