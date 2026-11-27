import type { PhotoAngle } from "./PhotoAngle.type";

export interface PhotoUpload {
  angle: PhotoAngle;
  isReplacing: boolean;
  mimeType: string;
}
