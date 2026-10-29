"use client";

import type { NullableRef } from "@/app/types";
import { useNoticeUrlCleanerViewModel } from "./hooks/useNoticeUrlCleanerViewModel";
import type { NoticeUrlCleanerProps } from "./models/NoticeUrlCleanerProps.interface";

const NoticeUrlCleaner = ({
  cleanPath,
}: NoticeUrlCleanerProps): NullableRef<React.JSX.Element> => {
  useNoticeUrlCleanerViewModel(cleanPath);

  return null;
};

export default NoticeUrlCleaner;
