import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { submitWorkerRegistration } from "./actions/submitWorkerRegistration";
import WorkerRegistrationView from "./WorkerRegistrationView";

const WorkerRegistration =
  async (): Promise<React.JSX.Element> => {
    if (!(await isAdministratorSignedIn())) {
      redirect(PATHS.HOME);
    }

    return (
      <WorkerRegistrationView
        action={submitWorkerRegistration}
      />
    );
  };

export default WorkerRegistration;
