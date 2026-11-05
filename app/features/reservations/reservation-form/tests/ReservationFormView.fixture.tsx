import { render } from "@testing-library/react";
import { vi } from "vitest";
import ReservationFormView from "../ReservationFormView";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { createReservationFormViewPage } from "./ReservationFormView.page";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";

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

const RESERVATION_FORM_VIEW_CATEGORIES = [
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
] satisfies ReservationCategoryOption[];

const renderReservationFormContainer = (
  guideLoadResult: ReservationGuideLoadResult
) => {
  routerBack.mockClear();
  const { container, rerender } = render(
    <ReservationFormView
      categories={RESERVATION_FORM_VIEW_CATEGORIES}
      guideLoadResult={guideLoadResult}
      initialDate={RESERVATION_FORM_VIEW_TEST.DATE}
    />
  );
  return {
    container,
    rerenderGuideLoadResult: (
      nextGuideLoadResult: ReservationGuideLoadResult
    ): void =>
      rerender(
        <ReservationFormView
          categories={RESERVATION_FORM_VIEW_CATEGORIES}
          guideLoadResult={nextGuideLoadResult}
          initialDate={RESERVATION_FORM_VIEW_TEST.DATE}
        />
      ),
  };
};

export const renderReservationForm = (
  guideLoadResult: ReservationGuideLoadResult = EMPTY_RESERVATION_GUIDE_LOAD_RESULT
) => {
  const renderedForm =
    renderReservationFormContainer(guideLoadResult);
  return {
    ...createReservationFormViewPage(
      renderedForm.container
    ),
    rerenderGuideLoadResult:
      renderedForm.rerenderGuideLoadResult,
  };
};
