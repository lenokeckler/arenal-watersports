import { render } from "@testing-library/react";
import { vi } from "vitest";
import ReservationFormView from "../ReservationFormView";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { createReservationFormViewPage } from "./ReservationFormView.page";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const { routerBack } = vi.hoisted(() => ({
  routerBack: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: routerBack }),
}));

vi.mock(
  "../hooks/useReservationEquipmentEligibility",
  () => ({
    useReservationEquipmentEligibility: (
      categories: ReservationCategoryOption[]
    ) => ({
      categories,
      hasError: false,
      isLoading: false,
      refreshKey: 0,
      retry: vi.fn(),
    }),
  })
);

export const reservationRouterBack = routerBack;

export const renderReservationForm = (
  hasCategories = true,
  hasUnitCategory = false
) => {
  routerBack.mockClear();
  const { container } = render(
    <ReservationFormView
      categories={
        hasCategories
          ? [
              {
                id: RESERVATION_FORM_VIEW_TEST.CATEGORY_ID,
                name: RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME,
              },
              {
                id: RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_ID,
                name: RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_NAME,
              },
            ]
          : []
      }
      unitCategories={
        hasUnitCategory
          ? [
              {
                id: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID,
                name: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME,
              },
            ]
          : []
      }
      initialDate={RESERVATION_FORM_VIEW_TEST.DATE}
    />
  );
  return createReservationFormViewPage(container);
};
