import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATIONS_BY_WORKER_COPY } from "../constants/ReservationsByWorkerCopy.constants";

export const createReservationsByWorkerViewPage = () => {
  const getCustomer = (customerName: string) =>
    screen.getByText(
      RESERVATIONS_BY_WORKER_COPY.CUSTOMER(customerName),
      { exact: true }
    );

  const getCreator = (workerName: string) =>
    screen.getByText(
      RESERVATIONS_BY_WORKER_COPY.RECORDED_BY(workerName),
      { exact: true }
    );

  return {
    getCreator,
    getCustomer,
    getEmptyState: () =>
      screen.getByText(RESERVATIONS_BY_WORKER_COPY.EMPTY, {
        exact: true,
      }),
    getNextPageLink: () =>
      screen.getByRole(ARIA_ROLE.LINK, {
        name: RESERVATIONS_BY_WORKER_COPY.NEXT_PAGE,
      }),
    getPageIndicator: (
      currentPage: number,
      pageCount: number
    ) =>
      screen.getByText(
        RESERVATIONS_BY_WORKER_COPY.PAGE(
          currentPage,
          pageCount
        ),
        { exact: true }
      ),
  };
};
