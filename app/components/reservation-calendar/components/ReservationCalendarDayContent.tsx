import { Fragment, type ReactElement } from "react";
import { Text } from "@/app/components";
import type { ReservationCalendarDayContentProps } from "../models/ReservationCalendarDayContentProps.interface";
import { ReservationCalendarBlock } from "./ReservationCalendarBlock";

export const ReservationCalendarDayContent = ({
  blocks,
  messages,
  showGuides = false,
}: ReservationCalendarDayContentProps): ReactElement => (
  <Fragment>
    {messages.map((message) => (
      <Text key={message}>{message}</Text>
    ))}
    {blocks.map((block) => (
      <ReservationCalendarBlock
        key={block.id}
        block={block}
        showGuides={showGuides}
      />
    ))}
  </Fragment>
);
