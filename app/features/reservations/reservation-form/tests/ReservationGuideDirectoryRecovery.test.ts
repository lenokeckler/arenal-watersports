import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { getReservationGuides } from "../services/getReservationGuides";
import { loadReservationGuideDirectory } from "../services/loadReservationGuideDirectory";
import { recordReservationGuideLoadFailure } from "../utils/recordReservationGuideLoadFailure";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";

vi.mock("../services/getReservationGuides", () => ({
  getReservationGuides: vi.fn(),
}));

vi.mock(
  "../utils/recordReservationGuideLoadFailure",
  () => ({
    recordReservationGuideLoadFailure: vi.fn(),
  })
);

describe("loadReservationGuideDirectory", () => {
  beforeEach(() => {
    vi.mocked(getReservationGuides).mockReset();
    vi.mocked(
      recordReservationGuideLoadFailure
    ).mockReset();
  });

  it("returns the guide directory without logging", async () => {
    const guides = [
      {
        id: RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
        name: RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME,
      },
    ];
    vi.mocked(getReservationGuides).mockResolvedValue(
      guides
    );

    await expect(
      loadReservationGuideDirectory()
    ).resolves.toEqual({
      guides,
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
    });
    expect(
      recordReservationGuideLoadFailure
    ).not.toHaveBeenCalled();
  });

  it("preserves the safe failure code and logs once", async () => {
    const cause = Object.assign(
      new Error("Database detail"),
      {
        code: RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE,
      }
    );
    vi.mocked(getReservationGuides).mockRejectedValue(
      cause
    );

    await expect(
      loadReservationGuideDirectory()
    ).resolves.toEqual({
      code: RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE,
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
    });
    expect(
      recordReservationGuideLoadFailure
    ).toHaveBeenCalledOnce();
    expect(
      recordReservationGuideLoadFailure
    ).toHaveBeenCalledWith(
      cause,
      RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE
    );
  });
});
