import { render } from "@testing-library/react";
import { vi } from "vitest";
import ReservationFormView from "../ReservationFormView";
import { createReservationFormViewPage } from "./ReservationFormView.page";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const { routerBack } = vi.hoisted(() => ({
  routerBack: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: routerBack }),
}));

export const reservationRouterBack = routerBack;

export const renderReservationForm = () => {
  routerBack.mockClear();
  const { container } = render(
    <ReservationFormView
      categories={[
        {
          id: RESERVATION_FORM_VIEW_TEST.CATEGORY_ID,
          name: RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME,
        },
        {
          id: RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_ID,
          name: RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_NAME,
        },
      ]}
      initialDate={RESERVATION_FORM_VIEW_TEST.DATE}
    />
  );
  return createReservationFormViewPage(container);
};
