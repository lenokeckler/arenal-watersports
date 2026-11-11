import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { EXTRA_FORM_MODE } from "./constants/ExtraFormMode.constants";
import ExtraFormView from "./ExtraFormView";
import type { ExtraEditFormProps } from "./models/ExtraEditFormProps.interface";
import { getExtra } from "./services/getExtra";

const ExtraEditForm = async ({
  extraId,
}: ExtraEditFormProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const extra = await getExtra(extraId);

  if (!extra) {
    notFound();
  }

  return (
    <ExtraFormView
      mode={EXTRA_FORM_MODE.EDIT}
      extra={extra}
    />
  );
};

export default ExtraEditForm;
