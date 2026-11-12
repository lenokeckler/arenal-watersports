import { UUID_PATTERN } from "@/app/constants";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import UnitPhotosView from "./UnitPhotosView";
import { UNIT_PHOTOS_COPY } from "./constants/UnitPhotosCopy.constants";
import type { UnitPhotosData } from "./models/UnitPhotosData.interface";
import type { UnitPhotosProps } from "./models/UnitPhotosProps.interface";
import { getUnitPhotos } from "./services/getUnitPhotos";
import type { JSX } from "react";

const UnitPhotos = async ({
  unitId,
}: UnitPhotosProps): Promise<JSX.Element> => {
  let data: NullableRef<UnitPhotosData> = null;
  let errorMessage: NullableRef<string> = null;

  try {
    data = UUID_PATTERN.test(unitId)
      ? await getUnitPhotos(unitId)
      : null;
    errorMessage = data ? null : UNIT_PHOTOS_COPY.NOT_FOUND;
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? UNIT_PHOTOS_COPY.FORBIDDEN
        : UNIT_PHOTOS_COPY.ERROR_LOAD;
  }

  return (
    <UnitPhotosView
      data={data}
      errorMessage={errorMessage}
    />
  );
};

export default UnitPhotos;
