import type { CreateExtraInput } from "./CreateExtraInput.interface";

export interface UpdateExtraInput extends CreateExtraInput {
  extraId: string;
}
