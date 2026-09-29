import { CALENDAR_PREVIEW_METADATA } from "@/app/constants";
import { CalendarPreviewEntry } from "@/app/components/calendar/CalendarPreviewEntry";
import type { CalendarPreviewPageProps } from "@/app/components/calendar/models/CalendarPreviewPageProps.interface";

export const metadata = CALENDAR_PREVIEW_METADATA;

const CalendarPreviewPage = async ({
  searchParams,
}: CalendarPreviewPageProps) => {
  const { example } = await searchParams;
  return <CalendarPreviewEntry example={example} />;
};

export default CalendarPreviewPage;
