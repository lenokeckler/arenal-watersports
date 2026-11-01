import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import CategoryDepositForm from "./CategoryDepositForm";
import type { CategoryDepositProps } from "./models/CategoryDepositProps.interface";
import { getCategoryDeposit } from "./services/getCategoryDeposit";

const CategoryDeposit = async ({
  categoryId,
}: CategoryDepositProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const deposit = await getCategoryDeposit(categoryId);

  if (!deposit) {
    notFound();
  }

  return <CategoryDepositForm deposit={deposit} />;
};

export default CategoryDeposit;
