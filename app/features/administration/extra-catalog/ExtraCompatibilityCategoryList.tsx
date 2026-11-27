import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import ExtraCompatibilityBoatsView from "./ExtraCompatibilityBoatsView";
import type { ExtraCompatibilityCategoryListProps } from "./models/ExtraCompatibilityCategoryListProps.interface";
import { getExtraCompatibilityCategories } from "./services/getExtraCompatibilityCategories";

const ExtraCompatibilityCategoryList = async ({
  extraId,
}: ExtraCompatibilityCategoryListProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const compatibility =
    await getExtraCompatibilityCategories(extraId);

  if (!compatibility) {
    notFound();
  }

  return <ExtraCompatibilityBoatsView {...compatibility} />;
};

export default ExtraCompatibilityCategoryList;
