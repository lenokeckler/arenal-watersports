import userEvent, {
  type UserEvent,
} from "@testing-library/user-event";
import { STRING } from "@/app/constants";
import { createCustomComboQueries } from "./CustomCombo.queries";

const createComboCategoryActions = (
  user: UserEvent,
  queries: ReturnType<typeof createCustomComboQueries>
) => {
  const selectCombo = async (): Promise<void> => {
    await user.click(queries.getComboOption());
  };
  const addCategory = async (
    categoryName: string
  ): Promise<void> => {
    await user.click(
      queries.getAddCategoryButton(categoryName)
    );
  };
  return {
    selectCombo,
    addCategory,
    selectComboWithCategory: async (
      categoryName: string
    ): Promise<void> => {
      await selectCombo();
      await addCategory(categoryName);
    },
    selectComboWithGuide: async (
      categoryName: string,
      guideName: string
    ): Promise<void> => {
      await selectCombo();
      await addCategory(categoryName);
      await user.click(queries.getGuideCheckbox(guideName));
    },
  };
};

const createQuantityActions = (
  user: UserEvent,
  queries: ReturnType<typeof createCustomComboQueries>
) => ({
  increaseCategory: async (
    categoryName: string
  ): Promise<void> => {
    await user.click(
      queries.getIncreaseCategoryButton(categoryName)
    );
  },
  decreaseCategory: async (
    categoryName: string
  ): Promise<void> => {
    await user.click(
      queries.getDecreaseCategoryButton(categoryName)
    );
  },
});

const createPricingActions = (
  user: UserEvent,
  queries: ReturnType<typeof createCustomComboQueries>
) => ({
  fillAgreedAmount: async (
    label: string,
    value: string
  ): Promise<void> => {
    const input = queries.getAgreedAmountInput(label);
    await user.clear(input);
    if (value !== STRING.Empty) {
      await user.type(input, value);
    }
  },
  selectDuration: async (label: string): Promise<void> => {
    await user.click(queries.getDurationOption(label));
  },
});

export const createCustomComboPage = (
  container: HTMLElement
) => {
  const user = userEvent.setup();
  const queries = createCustomComboQueries(container);
  return {
    ...queries,
    ...createComboCategoryActions(user, queries),
    ...createQuantityActions(user, queries),
    ...createPricingActions(user, queries),
  };
};
