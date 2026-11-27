import type { ComboAudience } from "./ComboAudience.type";

export interface ComboAudienceChooserProps {
  audience: ComboAudience;
  isDisabled: boolean;
  isLocked: boolean;
  onSelect: (audience: ComboAudience) => () => void;
}
