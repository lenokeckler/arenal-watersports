import { render } from "@testing-library/react";
import { vi } from "vitest";
import ReservationFormView from "../ReservationFormView";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { createReservationFormViewPage } from "./ReservationFormView.page";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";

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

const renderReservationFormContainer = (
  guideLoadResult: ReservationGuideLoadResult,
  predefinedCombos: ReservationPredefinedCombo[],
  categories: ReservationCategoryOption[]
) => {
  routerBack.mockClear();
  const { container } = render(
    <ReservationFormView
      categories={categories}
      guideLoadResult={guideLoadResult}
      initialDate={RESERVATION_FORM_VIEW_TEST.DATE}
      predefinedCombos={predefinedCombos}
    />
  );
  return container;
};

export const renderReservationForm = (
  guideLoadResult: ReservationGuideLoadResult = EMPTY_RESERVATION_GUIDE_LOAD_RESULT,
  predefinedCombos: ReservationPredefinedCombo[] = [],
  categories: ReservationCategoryOption[] = [
    {
      id: RESERVATION_FORM_VIEW_TEST.CATEGORY_ID,
      isGuideOnly: false,
      isInterchangeable: true,
      name: RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME,
    },
    {
      id: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID,
      isGuideOnly: true,
      isInterchangeable: false,
      name: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME,
    },
  ]
) =>
  createReservationFormViewPage(
    renderReservationFormContainer(
      guideLoadResult,
      predefinedCombos,
      categories
    )
  );
