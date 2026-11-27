import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import ExtraCompatibilityUnitsFormView from "./ExtraCompatibilityUnitsFormView";
import type { ExtraCompatibilityUnitsFormProps } from "./models/ExtraCompatibilityUnitsFormProps.interface";
import { getExtraCompatibilityUnits } from "./services/getExtraCompatibilityUnits";

const ExtraCompatibilityUnitsForm = async ({
  categoryId,
  extraId,
}: ExtraCompatibilityUnitsFormProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const compatibility = await getExtraCompatibilityUnits(
    extraId,
    categoryId
  );

  if (!compatibility) {
    notFound();
  }

  return (
    <ExtraCompatibilityUnitsFormView {...compatibility} />
  );
};

export default ExtraCompatibilityUnitsForm;
