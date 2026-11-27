import type { NullableRef } from "@/app/types";
import type { ComboAudienceSectionProps } from "./ComboAudienceSectionProps.interface";
import type { ComboRemovalSheetProps } from "./ComboRemovalSheetProps.interface";

export interface ComboListViewModel {
  onRetry: () => void;
  removalSheet: NullableRef<ComboRemovalSheetProps>;
  sections: ComboAudienceSectionProps[];
}
