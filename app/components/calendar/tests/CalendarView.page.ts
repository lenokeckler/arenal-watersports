import { createCalendarViewNavigationPage } from "./CalendarViewNavigation.page";
import { createCalendarViewPresentationPage } from "./CalendarViewPresentation.page";

export const createCalendarViewPage = () => {
  const navigation = createCalendarViewNavigationPage();
  const presentation = createCalendarViewPresentationPage();
  return {
    ...navigation,
    ...presentation,
    getNavigationControlsClassName: () =>
      presentation.getNavigationControls().className,
    getTitleClassName: () =>
      presentation.getTitle().className,
  };
};
