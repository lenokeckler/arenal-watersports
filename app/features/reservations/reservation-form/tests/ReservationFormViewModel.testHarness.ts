import { vi } from "vitest";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";

export const viewModelHarness = (() => {
  const values = {
    categoryId: "category-1",
    customerName: "Reserva del muelle",
    date: "2030-04-12",
    durationHours: 2,
    peopleCount: 4,
    quantity: 1,
    time: "09:30",
    unitId: "unit-1",
  };
  const handleCategoryChange = vi.fn((value: string) => {
    values.categoryId = value;
    values.unitId = "";
  });
  const handleUnitChange = vi.fn((value: string) => {
    values.unitId = value;
  });
  const eligibility: {
    current: {
      categories: ReservationCategoryOption[];
      hasError: boolean;
      isLoading: boolean;
      refreshKey: number;
      retry: () => void;
    };
  } = {
    current: {
      categories: [],
      hasError: false,
      isLoading: false,
      refreshKey: 1,
      retry: vi.fn(),
    },
  };
  const equipment = {
    current: {
      availableUnits: [{ code: "LANCHA-1", id: "unit-1" }],
      hasAvailabilityError: false,
      isAvailabilityLoading: false,
      requiresConcreteUnit: true,
    },
  };

  return {
    eligibility,
    equipment,
    handleCategoryChange,
    handleUnitChange,
    values,
  };
})();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: vi.fn() }),
}));

vi.mock("../hooks/useReservationFormState", () => ({
  useReservationFormState: () => ({
    duration: {
      resolveDurationHours: () =>
        viewModelHarness.values.durationHours,
    },
    durationHandlers: {},
    fields: {
      handleCategoryChange:
        viewModelHarness.handleCategoryChange,
      handleUnitChange: viewModelHarness.handleUnitChange,
      values: viewModelHarness.values,
    },
    submission: {
      clearFieldError: vi.fn(),
      errors: {},
      formError: "",
      isPending: false,
      isSubmitted: false,
      setFieldError: vi.fn(),
      submitReservation: vi.fn(),
    },
  }),
}));

vi.mock(
  "../hooks/useReservationEquipmentEligibility",
  () => ({
    useReservationEquipmentEligibility: () =>
      viewModelHarness.eligibility.current,
  })
);

vi.mock(
  "../hooks/useReservationEquipmentViewModel",
  () => ({
    useReservationEquipmentViewModel: () => ({
      ...viewModelHarness.equipment.current,
      categoryConflictWarning: {
        hasError: false,
        isLoading: false,
        items: [],
        retry: vi.fn(),
      },
    }),
  })
);

vi.mock(
  "../utils/createReservationFormSubmitHandler",
  () => ({
    createReservationFormSubmitHandler: () => vi.fn(),
  })
);

export const resetViewModelHarness = (): void => {
  viewModelHarness.values.categoryId = "category-1";
  viewModelHarness.values.customerName =
    "Reserva del muelle";
  viewModelHarness.values.date = "2030-04-12";
  viewModelHarness.values.durationHours = 2;
  viewModelHarness.values.peopleCount = 4;
  viewModelHarness.values.quantity = 1;
  viewModelHarness.values.time = "09:30";
  viewModelHarness.values.unitId = "unit-1";
  viewModelHarness.handleCategoryChange.mockClear();
  viewModelHarness.handleUnitChange.mockClear();
  viewModelHarness.eligibility.current = {
    categories: [
      {
        id: "category-1",
        isInterchangeable: false,
        name: "Lancha",
      },
    ],
    hasError: false,
    isLoading: false,
    refreshKey: 1,
    retry: vi.fn(),
  };
  viewModelHarness.equipment.current = {
    availableUnits: [{ code: "LANCHA-1", id: "unit-1" }],
    hasAvailabilityError: false,
    isAvailabilityLoading: false,
    requiresConcreteUnit: true,
  };
};
