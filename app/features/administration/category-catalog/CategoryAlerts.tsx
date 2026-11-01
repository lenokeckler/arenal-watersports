import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import CategoryAlertsForm from "./CategoryAlertsForm";
import type { CategoryAlertsProps } from "./models/CategoryAlertsProps.interface";
import { getCategoryAlerts } from "./services/getCategoryAlerts";

const CategoryAlerts = async ({
  categoryId,
}: CategoryAlertsProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const alerts = await getCategoryAlerts(categoryId);

  if (!alerts) {
    notFound();
  }

  return <CategoryAlertsForm alerts={alerts} />;
};

export default CategoryAlerts;
