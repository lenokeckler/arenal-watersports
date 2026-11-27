import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import CategoryConfigureView from "./CategoryConfigureView";
import type { CategoryConfigureProps } from "./models/CategoryConfigureProps.interface";
import { getCategoryConfiguration } from "./services/getCategoryConfiguration";

const CategoryConfigure = async ({
  categoryId,
}: CategoryConfigureProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const configuration =
    await getCategoryConfiguration(categoryId);

  if (!configuration) {
    notFound();
  }

  return (
    <CategoryConfigureView configuration={configuration} />
  );
};

export default CategoryConfigure;
