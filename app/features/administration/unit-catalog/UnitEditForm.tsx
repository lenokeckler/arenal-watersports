import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { UNIT_CATEGORY_TRACKING_MODE } from "./constants/UnitCategoryTrackingMode.constants";
import { UNIT_FORM_MODE } from "./constants/UnitFormMode.constants";
import type { UnitEditFormProps } from "./models/UnitEditFormProps.interface";
import { getUnit } from "./services/getUnit";
import { getUnitCategory } from "./services/getUnitCategory";
import UnitFormView from "./UnitFormView";

const UnitEditForm = async ({
  categoryId,
  unitId,
}: UnitEditFormProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const [category, unit] = await Promise.all([
    getUnitCategory(categoryId),
    getUnit(unitId),
  ]);

  if (
    !category ||
    !unit ||
    category.trackingMode !==
      UNIT_CATEGORY_TRACKING_MODE.BY_UNIT ||
    unit.categoryId !== categoryId
  ) {
    notFound();
  }

  return (
    <UnitFormView
      mode={UNIT_FORM_MODE.EDIT}
      category={category}
      unit={unit}
    />
  );
};

export default UnitEditForm;
