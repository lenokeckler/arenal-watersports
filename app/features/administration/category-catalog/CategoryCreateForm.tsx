import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import CategoryCreateFormView from "./CategoryCreateFormView";

const CategoryCreateForm =
  async (): Promise<React.JSX.Element> => {
    if (!(await isAdministratorSignedIn())) {
      redirect(PATHS.HOME);
    }

    return <CategoryCreateFormView />;
  };

export default CategoryCreateForm;
