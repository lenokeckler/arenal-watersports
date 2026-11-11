import { E2E_UNIT_PHOTOS } from "../constants/E2eUnitPhotos.constants";

export const buildE2ePhoto = (): Buffer =>
  Buffer.from(E2E_UNIT_PHOTOS.PHOTO_BASE64, "base64");
