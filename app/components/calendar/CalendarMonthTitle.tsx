import type { ReactElement } from "react";
import { Button, Title } from "@/app/components";
import {
  BUTTON,
  BUTTON_TYPES,
  TitleVariant,
} from "@/app/constants";
import type { CalendarMonthTitleProps } from "./models/CalendarMonthTitleProps.interface";
import { CALENDAR_MONTH_SELECT_BUTTON_CLASS } from "./styles/Calendar.styles";
import { isSameCalendarDate } from "./utils/isSameCalendarDate";

export const CalendarMonthTitle = ({
  date,
  monthSelection,
  title,
}: CalendarMonthTitleProps): ReactElement => {
  if (monthSelection === undefined) {
    return (
      <Title
        variant={TitleVariant.AUXILIAR}
        text={title}
      />
    );
  }
  const selected = isSameCalendarDate(
    monthSelection.selectedDate,
    date
  );
  return (
    <Title
      variant={TitleVariant.AUXILIAR}
      text={title}
    >
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.BASE}
        className={CALENDAR_MONTH_SELECT_BUTTON_CLASS}
        aria-pressed={selected}
        onClick={() => monthSelection.onSelect(date)}
      >
        {title}
      </Button>
    </Title>
  );
};
