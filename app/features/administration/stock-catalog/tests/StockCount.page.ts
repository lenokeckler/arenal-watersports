import {
  fireEvent,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
import { ARIA_ROLE } from "@/app/constants";
import type { StockAdjustmentReason } from "../constants/StockAdjustmentReason.constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";

export const createStockCountPage = () => {
  const user = userEvent.setup();
  const options = { exact: false };

  const getControl = (label: string) =>
    screen.getByLabelText(label, options);

  const queryControl = (label: string) =>
    screen.queryByLabelText(label, options);

  const getSaveButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: STOCK_COUNT_COPY.SAVE_BUTTON,
    });

  const getSavingButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: STOCK_COUNT_COPY.LOADING_TEXT,
    });

  const getQuantityInput = (label: string) =>
    screen.getByRole(ARIA_ROLE.TEXTBOX, { name: label });

  const getQuantityBlock = (label: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, { name: label })
    );

  const getSummaryTotal = () =>
    screen.getByText(
      STOCK_COUNT_COPY.TOTAL_REGISTERED_LABEL,
      { selector: "span" }
    ).parentElement as HTMLElement;

  const clickStep = (prefix: string, label: string) =>
    user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: `${prefix} ${label}`,
      })
    );

  const increase = (label: string) =>
    clickStep(STOCK_COUNT_COPY.INCREASE_PREFIX, label);

  const decrease = (label: string) =>
    clickStep(STOCK_COUNT_COPY.DECREASE_PREFIX, label);

  const setQuantity = async (
    label: string,
    text: string
  ) => {
    const field = getQuantityInput(label);
    await user.clear(field);
    await user.type(field, text);
  };

  const setExpiryDate = (date: string) => {
    fireEvent.change(
      getControl(STOCK_COUNT_COPY.EXPIRY_DATE_LABEL),
      { target: { value: date } }
    );
  };

  const selectReason = (reason: StockAdjustmentReason) =>
    user.selectOptions(
      getControl(STOCK_COUNT_COPY.REASON_LABEL),
      reason
    );

  const getReasonOptionLabels = () =>
    Array.from(
      (
        getControl(
          STOCK_COUNT_COPY.REASON_LABEL
        ) as HTMLSelectElement
      ).options
    ).map((option) => option.textContent);

  const submit = () => user.click(getSaveButton());

  const getHistoryCard = (dateText: string) =>
    screen.queryByRole(ARIA_ROLE.GROUP, { name: dateText });

  const getHistoryCardContent = (dateText: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, { name: dateText })
    );

  const getText = (text: string | RegExp) =>
    screen.queryByText(text);

  const getAlert = () =>
    screen.queryByRole(ARIA_ROLE.ALERT);

  const getBackButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: STOCK_COUNT_COPY.BACK_TO_CATEGORIES_BUTTON,
    });

  const clickBack = () =>
    user.click(getBackButton() as HTMLElement);

  const getHeading = (title: string) =>
    screen.queryByRole(ARIA_ROLE.HEADING, { name: title });

  const getRetryButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: STOCK_COUNT_COPY.RETRY_BUTTON,
    });

  const clickRetry = () =>
    user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: STOCK_COUNT_COPY.RETRY_BUTTON,
      })
    );

  const getPreviousLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.PREVIOUS,
    });

  const getNextLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.NEXT,
    });

  return {
    clickRetry,
    getAlert,
    clickBack,
    getBackButton,
    decrease,
    getControl,
    getQuantityBlock,
    getQuantityInput,
    getSummaryTotal,
    increase,
    getHeading,
    getHistoryCard,
    getHistoryCardContent,
    getNextLink,
    getPreviousLink,
    getReasonOptionLabels,
    getRetryButton,
    getSaveButton,
    getSavingButton,
    getText,
    queryControl,
    selectReason,
    setExpiryDate,
    setQuantity,
    submit,
  };
};
