import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import ComboFormView from "./ComboFormView";
import type { ComboEditFormProps } from "./models/ComboEditFormProps.interface";
import { getComboForEdit } from "./services/getComboForEdit";
import { listComboCategoryOptions } from "./services/listComboCategoryOptions";

const ComboEditForm = async ({
  comboId,
}: ComboEditFormProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const [combo, categoryOptions] = await Promise.all([
    getComboForEdit(comboId),
    listComboCategoryOptions(),
  ]);

  if (!combo) {
    notFound();
  }

  return (
    <ComboFormView
      categoryOptions={categoryOptions}
      combo={combo}
    />
  );
};

export default ComboEditForm;
