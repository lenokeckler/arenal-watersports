"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import type { NullableRef } from "@/app/types";
import { useLinkSheetViewModel } from "./hooks/useLinkSheetViewModel";
import type { LinkSheetProps } from "./models/LinkSheetProps.interface";
import { LINK_SHEET_BODY_CLASS } from "./styles/LinkSheet.styles";
import type { JSX } from "react";

const LinkSheet = ({
  children,
  closeHref,
  title,
}: LinkSheetProps): NullableRef<JSX.Element> => {
  const { close, isReady } =
    useLinkSheetViewModel(closeHref);

  return isReady ? (
    <ActionSheet
      title={title}
      onClose={close}
    >
      <div className={LINK_SHEET_BODY_CLASS}>
        {children}
      </div>
    </ActionSheet>
  ) : null;
};

export default LinkSheet;
