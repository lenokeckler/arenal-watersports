import { render } from "@testing-library/react";
import CategoryDepositForm from "../CategoryDepositForm";
import { createCategoryDepositFormPage } from "./CategoryDepositForm.page";
import { DEFAULT_CATEGORY_DEPOSIT } from "./CategoryDepositFormValues.constants";

export const renderCategoryDepositForm = () => {
  render(
    <CategoryDepositForm
      deposit={DEFAULT_CATEGORY_DEPOSIT}
    />
  );
  return createCategoryDepositFormPage();
};
