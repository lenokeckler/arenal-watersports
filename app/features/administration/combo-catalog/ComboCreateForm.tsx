import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import ComboFormView from "./ComboFormView";
import { listComboCategoryOptions } from "./services/listComboCategoryOptions";

const ComboCreateForm =
  async (): Promise<React.JSX.Element> => {
    if (!(await isAdministratorSignedIn())) {
      redirect(PATHS.HOME);
    }

    return (
      <ComboFormView
        categoryOptions={await listComboCategoryOptions()}
      />
    );
  };

export default ComboCreateForm;
