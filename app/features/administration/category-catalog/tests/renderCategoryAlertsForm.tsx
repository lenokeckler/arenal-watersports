import { render } from "@testing-library/react";
import CategoryAlertsForm from "../CategoryAlertsForm";
import type { CategoryAlerts } from "../models/CategoryAlerts.interface";
import { DEFAULT_CATEGORY_ALERTS } from "./CategoryAlerts.constants";
import { createCategoryAlertsFormPage } from "./CategoryAlertsForm.page";

export const renderCategoryAlertsForm = (
  alerts: CategoryAlerts = DEFAULT_CATEGORY_ALERTS
) => {
  render(<CategoryAlertsForm alerts={alerts} />);
  return createCategoryAlertsFormPage();
};
