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

  const combo = await getComboForEdit(comboId);

  if (!combo) {
    notFound();
  }

  const categoryOptions = await listComboCategoryOptions(
    combo.items.map((item) => item.categoryId)
  );

  return (
    <ComboFormView
      categoryOptions={categoryOptions}
      combo={combo}
    />
  );
};

export default ComboEditForm;
