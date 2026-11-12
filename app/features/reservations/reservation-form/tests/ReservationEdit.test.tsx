import { render } from "@testing-library/react";
import { notFound } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import ReservationEdit from "../ReservationEdit";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import { getReservationCategories } from "../services/getReservationCategories";
import { getReservationEdit } from "../services/getReservationEdit";
import {
  RESERVATION_EDIT,
  RESERVATION_EDIT_CATEGORY_OPTION,
  RESERVATION_EDIT_NOT_FOUND_SIGNAL,
  RESERVATION_EDIT_TEST,
} from "./ReservationEdit.constants";
import { createReservationEditPage } from "./ReservationEdit.page";

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
    vi.clearAllMocks();
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

  it("shows the non-editable state without reading the catalog", async () => {
    vi.mocked(getReservationEdit).mockResolvedValue({
      ...RESERVATION_EDIT,
      isEditable: false,
    });

    const { container } = render(
      await ReservationEdit({
        reservationId: RESERVATION_EDIT.id,
      })
    );
    const page = createReservationEditPage(container);

    expect(page.getUnavailableHeading()).toBeVisible();
    expect(page.getUnavailableMessage()).toHaveTextContent(
      RESERVATION_EDIT_COPY.UNAVAILABLE_DESCRIPTION
    );
    expect(page.queryButton()).toBeNull();
    page
      .getBackLinks()
      .forEach((link) =>
        expect(link).toHaveAttribute(
          RESERVATION_EDIT_TEST.HREF_ATTRIBUTE,
          PATHS.RESERVATIONS.CALENDAR
        )
      );
    expect(getReservationCategories).not.toHaveBeenCalled();
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
