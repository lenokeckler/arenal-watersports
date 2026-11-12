import type { WorkModeChoiceState } from "./WorkModeChoiceState.type";

export type WorkModeChoiceServerAction = (
  previousState: WorkModeChoiceState,
  formData: FormData
) => Promise<WorkModeChoiceState>;
