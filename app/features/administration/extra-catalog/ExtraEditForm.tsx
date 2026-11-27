import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { EXTRA_FORM_MODE } from "./constants/ExtraFormMode.constants";
import ExtraFormView from "./ExtraFormView";
import type { ExtraEditFormProps } from "./models/ExtraEditFormProps.interface";
import { getExtra } from "./services/getExtra";
import { getOccupiableCategories } from "./services/getOccupiableCategories";
import { includeOccupiedCategory } from "./utils/includeOccupiedCategory";

const ExtraEditForm = async ({
  extraId,
}: ExtraEditFormProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const [extra, occupiableCategories] = await Promise.all([
    getExtra(extraId),
    getOccupiableCategories(),
  ]);

  if (!extra) {
    notFound();
  }

  return (
    <ExtraFormView
      mode={EXTRA_FORM_MODE.EDIT}
      extra={extra}
      occupiableCategories={includeOccupiedCategory(
        occupiableCategories,
        extra
      )}
    />
  );
};

export default ExtraEditForm;
