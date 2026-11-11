import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getPredefinedReservationCombos } from "../services/getPredefinedReservationCombos";
import { getReservationCategories } from "../services/getReservationCategories";
import { loadReservationGuideDirectory } from "../services/loadReservationGuideDirectory";
import { getCostaRicaDate } from "../utils/getCostaRicaDate";
import ReservationForm from "../ReservationForm";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";
import { PREDEFINED_COMBO_FORM_TEST } from "./usePredefinedComboForm.constants";

vi.mock(
  "../services/getPredefinedReservationCombos",
  () => ({
    getPredefinedReservationCombos: vi.fn(),
  })
);

vi.mock("../services/getReservationCategories", () => ({
  getReservationCategories: vi.fn(),
}));

vi.mock(
  "../services/loadReservationGuideDirectory",
  () => ({
    loadReservationGuideDirectory: vi.fn(),
  })
);

vi.mock("../utils/getCostaRicaDate", () => ({
  getCostaRicaDate: vi.fn(),
}));

describe("ReservationForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(
      getPredefinedReservationCombos
    ).mockResolvedValue([PREDEFINED_COMBO_FORM_TEST.COMBO]);
    vi.mocked(getReservationCategories).mockResolvedValue(
      []
    );
    vi.mocked(
      loadReservationGuideDirectory
    ).mockResolvedValue(
      EMPTY_RESERVATION_GUIDE_LOAD_RESULT
    );
    vi.mocked(getCostaRicaDate).mockReturnValue(
      "2026-01-01"
    );
  });

  it("passes the server-loaded predefined combo catalog to the view", async () => {
    const reservationForm = await ReservationForm();

    expect(reservationForm).toMatchObject({
      props: {
        predefinedCombos: [
          PREDEFINED_COMBO_FORM_TEST.COMBO,
        ],
      },
    });
    expect(
      getPredefinedReservationCombos
    ).toHaveBeenCalledOnce();
  });
});
