"use client";

import { useId } from "react";
import { createPortal } from "react-dom";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/components/title/constants";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import { ACTION_SHEET_COPY } from "./constants/ActionSheetCopy.constants";
import { useCloseOnEscape } from "./hooks/useCloseOnEscape";
import type { ActionSheetProps } from "./models/ActionSheetProps.interface";
import {
  ACTION_SHEET_BACKDROP_CLASS,
  ACTION_SHEET_BODY_CLASS,
  ACTION_SHEET_CLOSE_CLASS,
  ACTION_SHEET_HEADER_CLASS,
  ACTION_SHEET_OVERLAY_CLASS,
  ACTION_SHEET_PANEL_CLASS,
  ACTION_SHEET_TITLE_CLASS,
} from "./styles/ActionSheet.styles";

const ActionSheet = ({
  children,
  onClose,
  title,
}: ActionSheetProps): React.JSX.Element => {
  const titleId = useId();

  useCloseOnEscape(onClose);

  return createPortal(
    <div className={ACTION_SHEET_OVERLAY_CLASS}>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.BASE}
        aria-label={ACTION_SHEET_COPY.CLOSE}
        className={ACTION_SHEET_BACKDROP_CLASS}
        onClick={onClose}
      >
        {null}
      </Button>
      <div
        role={ARIA_ROLE.DIALOG}
        aria-modal="true"
        aria-labelledby={titleId}
        className={ACTION_SHEET_PANEL_CLASS}
      >
        <div className={ACTION_SHEET_HEADER_CLASS}>
          <Title
            id={titleId}
            variant={TitleVariant.SECONDARY}
            text={title}
            className={ACTION_SHEET_TITLE_CLASS}
          />
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.BASE}
            className={ACTION_SHEET_CLOSE_CLASS}
            onClick={onClose}
          >
            {ACTION_SHEET_COPY.CLOSE}
          </Button>
        </div>
        <div className={ACTION_SHEET_BODY_CLASS}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ActionSheet;
