import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import CategoryBehaviorForm from "./CategoryBehaviorForm";
import type { CategoryBehaviorProps } from "./models/CategoryBehaviorProps.interface";
import { getCategoryBehavior } from "./services/getCategoryBehavior";

const CategoryBehavior = async ({
  categoryId,
}: CategoryBehaviorProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const behavior = await getCategoryBehavior(categoryId);

  if (!behavior) {
    notFound();
  }

  return <CategoryBehaviorForm behavior={behavior} />;
};

export default CategoryBehavior;
