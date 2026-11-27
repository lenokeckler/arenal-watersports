import type { UnitPhotoPreviewProps } from "./UnitPhotoPreviewProps.interface";

export interface UnitPhotoLargeViewProps extends UnitPhotoPreviewProps {
  onClose: () => void;
}
