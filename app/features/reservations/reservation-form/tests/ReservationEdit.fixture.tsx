import { render } from "@testing-library/react";
import { vi } from "vitest";
import ReservationEditView from "../ReservationEditView";
import { updateReservationAction } from "../actions/updateReservationAction";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import {
  RESERVATION_EDIT,
  RESERVATION_EDIT_CATEGORY_OPTION,
} from "./ReservationEdit.constants";
import { createReservationEditPage } from "./ReservationEdit.page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: vi.fn() }),
}));

vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({
    getAvailableReservationUnitsAction: vi
      .fn()
      .mockResolvedValue({
        availableQuantity: null,
        availableUnits: [],
      }),
  })
);

vi.mock(
  "../actions/getReservationCategoryAvailabilityAction",
  () => ({
    getReservationCategoryAvailabilityAction: vi
      .fn()
      .mockResolvedValue({
        committed: 0,
        free: 1,
        usable: 1,
      }),
  })
);

vi.mock("../actions/updateReservationAction", () => ({
  updateReservationAction: vi.fn(),
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

export const updateAction = updateReservationAction;

export const renderReservationEdit = () => {
  const { container } = render(
    <ReservationEditView
      categories={[RESERVATION_EDIT_CATEGORY_OPTION]}
      reservation={RESERVATION_EDIT}
    />
  );
  return createReservationEditPage(container);
};
