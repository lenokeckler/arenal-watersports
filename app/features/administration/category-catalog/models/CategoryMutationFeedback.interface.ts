import type { Status } from "@/app/components/toast/models/Toast.types";

export interface CategoryMutationFeedback {
  status: Status;
  message: string;
}
