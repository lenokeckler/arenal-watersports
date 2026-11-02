import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { UNIT_CATEGORY_TRACKING_MODE } from "./constants/UnitCategoryTrackingMode.constants";
import { UNIT_FORM_MODE } from "./constants/UnitFormMode.constants";
import type { UnitCreateFormProps } from "./models/UnitCreateFormProps.interface";
import { getUnitCategory } from "./services/getUnitCategory";
import UnitFormView from "./UnitFormView";

const UnitCreateForm = async ({
  categoryId,
}: UnitCreateFormProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const category = await getUnitCategory(categoryId);

  if (
    !category ||
    category.trackingMode !==
      UNIT_CATEGORY_TRACKING_MODE.BY_UNIT
  ) {
    notFound();
  }

  return (
    <UnitFormView
      mode={UNIT_FORM_MODE.CREATE}
      category={category}
    />
  );
};

export default UnitCreateForm;
