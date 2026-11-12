import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { EXTRA_FORM_MODE } from "./constants/ExtraFormMode.constants";
import ExtraFormView from "./ExtraFormView";

const ExtraCreateForm =
  async (): Promise<React.JSX.Element> => {
    if (!(await isAdministratorSignedIn())) {
      redirect(PATHS.HOME);
    }

    return <ExtraFormView mode={EXTRA_FORM_MODE.CREATE} />;
  };

export default ExtraCreateForm;
