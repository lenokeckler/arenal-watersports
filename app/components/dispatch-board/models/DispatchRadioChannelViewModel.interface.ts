import type { ChangeEvent } from "react";
import type { NullableRef } from "@/app/types";

export interface DispatchRadioChannelViewModel {
  channel: NullableRef<number>;
  error: NullableRef<string>;
  handleChange: (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  isValid: boolean;
  text: string;
}
