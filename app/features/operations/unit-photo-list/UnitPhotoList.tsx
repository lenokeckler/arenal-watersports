import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import UnitPhotoListView from "./UnitPhotoListView";
import { UNIT_PHOTO_LIST_COPY } from "./constants/UnitPhotoListCopy.constants";
import type { UnitPhotoListData } from "./models/UnitPhotoListData.interface";
import type { UnitPhotoListProps } from "./models/UnitPhotoListProps.interface";
import { getUnitPhotoList } from "./services/getUnitPhotoList";
import type { JSX } from "react";

const UnitPhotoList = async (
  props: UnitPhotoListProps = {}
): Promise<JSX.Element> => {
  let data: NullableRef<UnitPhotoListData> = null;
  let errorMessage: NullableRef<string> = null;

  try {
    data = await getUnitPhotoList(props);
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? UNIT_PHOTO_LIST_COPY.FORBIDDEN
        : UNIT_PHOTO_LIST_COPY.ERROR;
  }

  return (
    <UnitPhotoListView
      data={data}
      errorMessage={errorMessage}
    />
  );
};

export default UnitPhotoList;
