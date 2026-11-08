import { notFound } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import ReservationEdit from "../ReservationEdit";
import { getReservationCategories } from "../services/getReservationCategories";
import { getReservationEdit } from "../services/getReservationEdit";
import {
  RESERVATION_EDIT,
  RESERVATION_EDIT_CATEGORY_OPTION,
  RESERVATION_EDIT_NOT_FOUND_SIGNAL,
} from "./ReservationEdit.constants";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

vi.mock("../services/getReservationEdit", () => ({
  getReservationEdit: vi.fn(),
}));

vi.mock("../services/getReservationCategories", () => ({
  getReservationCategories: vi.fn(),
}));

vi.mock("../ReservationEditView", () => ({
  default: vi.fn(),
}));

describe("ReservationEdit", () => {
  beforeEach(() => {
    vi.mocked(notFound).mockImplementation(() => {
      throw new Error(RESERVATION_EDIT_NOT_FOUND_SIGNAL);
    });
  });

  it("answers 404 for an unknown reservation", async () => {
    vi.mocked(getReservationEdit).mockResolvedValue(null);

    await expect(
      ReservationEdit({
        reservationId: RESERVATION_EDIT.id,
      })
    ).rejects.toThrow(RESERVATION_EDIT_NOT_FOUND_SIGNAL);
  });

  it("passes the reservation and the catalog to the view", async () => {
    vi.mocked(getReservationEdit).mockResolvedValue(
      RESERVATION_EDIT
    );
    vi.mocked(getReservationCategories).mockResolvedValue([
      RESERVATION_EDIT_CATEGORY_OPTION,
    ]);

    const element = await ReservationEdit({
      reservationId: RESERVATION_EDIT.id,
    });

    expect(element.props).toEqual({
      categories: [RESERVATION_EDIT_CATEGORY_OPTION],
      reservation: RESERVATION_EDIT,
    });
  });
});
