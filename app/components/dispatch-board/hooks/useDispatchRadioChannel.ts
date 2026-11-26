"use client";

import { useState } from "react";
import { STRING } from "@/app/constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchRadioChannelViewModel } from "../models/DispatchRadioChannelViewModel.interface";
import { parseRadioChannel } from "../utils/parseRadioChannel";

export const useDispatchRadioChannel = (
  initialText: string = STRING.Empty
): DispatchRadioChannelViewModel => {
  const [text, setText] = useState<string>(initialText);
  const channel = parseRadioChannel(text);
  const isEmpty = text.trim() === STRING.Empty;
  const isValid = isEmpty || channel !== null;

  return {
    channel,
    error: isValid
      ? null
      : DISPATCH_SHEET_COPY.RADIO_INVALID,
    handleChange: (event) => setText(event.target.value),
    isValid,
    text,
  };
};
