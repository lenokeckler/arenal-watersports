import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import type { TariffEditFormProps } from "./models/TariffEditFormProps.interface";
import { getTariffForEdit } from "./services/getTariffForEdit";
import TariffFormView from "./TariffFormView";

const TariffEditForm = async ({
  categoryId,
}: TariffEditFormProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const tariff = await getTariffForEdit(categoryId);

  if (!tariff) {
    notFound();
  }

  return <TariffFormView tariff={tariff} />;
};

export default TariffEditForm;
