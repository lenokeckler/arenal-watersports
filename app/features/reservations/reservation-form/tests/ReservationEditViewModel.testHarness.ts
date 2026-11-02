import { act, renderHook } from "@testing-library/react";
import type { FormEvent } from "react";
import { vi } from "vitest";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { updateReservationAction } from "../actions/updateReservationAction";
import { useReservationEditViewModel } from "../hooks/useReservationEditViewModel";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import { RESERVATION_EDIT } from "./ReservationEdit.constants";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: vi.fn() }),
}));
vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({ getAvailableReservationUnitsAction: vi.fn() })
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

export const availabilityAction =
  getAvailableReservationUnitsAction;

export const updateAction = updateReservationAction;

export const renderEditViewModel = (
  reservation = RESERVATION_EDIT
) =>
  renderHook(
    (props) => useReservationEditViewModel(props),
    { initialProps: { categories: [], reservation } }
  );

export const submitEditViewModel = async (
  viewModel: ReservationFormViewModel
): Promise<void> => {
  await act(async () => {
    viewModel.handleSubmit({
      preventDefault: vi.fn(),
    } as unknown as FormEvent<HTMLFormElement>);
    await Promise.resolve();
  });
};
