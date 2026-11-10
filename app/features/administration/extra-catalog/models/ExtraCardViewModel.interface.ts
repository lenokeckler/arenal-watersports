import type { ExtraStatus } from "./ExtraStatus.type";

export interface ExtraCardViewModel {
  editHref: string;
  id: string;
  name: string;
  status: ExtraStatus;
}
