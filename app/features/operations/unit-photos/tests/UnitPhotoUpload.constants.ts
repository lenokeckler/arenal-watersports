import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import { PHOTOS_DATA } from "./UnitPhotos.constants";

export const MANAGER_DATA = {
  ...PHOTOS_DATA,
  canManage: true,
};

export const FRONT_LABEL = `${UNIT_PHOTOS_COPY.UPLOAD}: ${UNIT_PHOTOS_COPY.ANGLE.front}`;

export const RIGHT_LABEL = `${UNIT_PHOTOS_COPY.REPLACE}: ${UNIT_PHOTOS_COPY.ANGLE.right_side}`;

export const buildPhotoFile = (type: string): File =>
  new File(["photo"], "photo.jpg", { type });
