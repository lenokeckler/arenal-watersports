import { render } from "@testing-library/react";
import { vi } from "vitest";
import ReservationFormView from "../ReservationFormView";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";
import { createReservationFormViewPage } from "./ReservationFormView.page";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const { routerBack } = vi.hoisted(() => ({
  routerBack: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  unstable_rethrow: vi.fn(),
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
  hasUnitCategory = false,
  hasGuideOnlyCategory = false,
  guideLoadResult: ReservationGuideLoadResult = EMPTY_RESERVATION_GUIDE_LOAD_RESULT
) => {
  routerBack.mockClear();
  const props = {
    categories: hasCategories
      ? [
          {
            id: RESERVATION_FORM_VIEW_TEST.CATEGORY_ID,
            isInterchangeable: true,
            isGuideOnly: false,
            name: RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME,
          },
          {
            id: RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_ID,
            isInterchangeable: true,
            isGuideOnly: hasGuideOnlyCategory,
            name: RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_NAME,
          },
          ...(hasUnitCategory
            ? [
                {
                  id: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID,
                  isInterchangeable: true,
                  isGuideOnly: hasGuideOnlyCategory,
                  name: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME,
                },
              ]
            : []),
        ]
      : [],
    unitCategories: hasUnitCategory
      ? [
          {
            id: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID,
            isGuideOnly: hasGuideOnlyCategory,
            name: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME,
          },
        ]
      : [],
    initialDate: RESERVATION_FORM_VIEW_TEST.DATE,
    guideLoadResult,
    predefinedCombos: [],
  };
  const { container, rerender } = render(
    <ReservationFormView {...props} />
  );
  return {
    ...createReservationFormViewPage(container),
    rerenderGuideLoadResult: (
      nextGuideLoadResult: ReservationGuideLoadResult
    ): void => {
      rerender(
        <ReservationFormView
          {...props}
          guideLoadResult={nextGuideLoadResult}
        />
      );
    },
  };
};

export const renderReservationFormWithCombos = (
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
      isInterchangeable: true,
      name: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME,
    },
  ]
) => {
  routerBack.mockClear();
  const { container } = render(
    <ReservationFormView
      categories={categories}
      guideLoadResult={guideLoadResult}
      initialDate={RESERVATION_FORM_VIEW_TEST.DATE}
      predefinedCombos={predefinedCombos}
      unitCategories={[]}
    />
  );
  return createReservationFormViewPage(container);
};
