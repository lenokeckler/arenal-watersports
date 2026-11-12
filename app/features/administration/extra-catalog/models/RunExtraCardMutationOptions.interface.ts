import type { useToast } from "@/app/components/toast/utils/useToast";
import type { ExtraCardMutationResult } from "./ExtraCardMutationResult.interface";
import type { ExtraPendingIdSetter } from "./ExtraPendingIdSetter.type";

export interface RunExtraCardMutationOptions {
  extraId: string;
  genericErrorMessage: string;
  mutate: (
    extraId: string
  ) => Promise<ExtraCardMutationResult>;
  onSettled: () => void;
  setPendingExtraId: ExtraPendingIdSetter;
  showToast: ReturnType<typeof useToast>["showToast"];
}
