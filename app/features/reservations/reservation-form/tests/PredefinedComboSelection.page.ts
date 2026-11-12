import userEvent from "@testing-library/user-event";
import { createPredefinedComboSelectionQueries } from "./PredefinedComboSelection.queries";
import { createPredefinedComboSelectionActions } from "./createPredefinedComboSelectionActions";

export const createPredefinedComboSelectionPage = (
  container: HTMLElement
) => {
  const user = userEvent.setup();
  const queries =
    createPredefinedComboSelectionQueries(container);
  const actions = createPredefinedComboSelectionActions(
    user,
    queries
  );

  return { ...queries, ...actions };
};
