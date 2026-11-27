"use client";

import LinkSheet from "@/app/components/link-sheet/LinkSheet";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { useDayPanelViewModel } from "./hooks/useDayPanelViewModel";
import type { DayPanelProps } from "./models/DayPanelProps.interface";
import {
  DAY_PANEL_CLASS,
  DAY_PANEL_TITLE_CLASS,
} from "./styles/DayPanel.styles";
import type { JSX } from "react";

const DayPanel = ({
  children,
  closeHref,
  isOpen,
  title,
}: DayPanelProps): NullableRef<JSX.Element> => {
  const { isSheet } = useDayPanelViewModel();

  if (isSheet) {
    return isOpen ? (
      <LinkSheet
        closeHref={closeHref}
        title={title}
      >
        {children}
      </LinkSheet>
    ) : null;
  }

  return (
    <aside className={DAY_PANEL_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={title}
        className={DAY_PANEL_TITLE_CLASS}
      />
      {children}
    </aside>
  );
};

export default DayPanel;
