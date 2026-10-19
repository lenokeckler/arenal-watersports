import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationGuidesAction } from "../actions/getReservationGuidesAction";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { loadReservationGuideDirectory } from "../services/loadReservationGuideDirectory";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";

vi.mock(
  "../services/loadReservationGuideDirectory",
  () => ({ loadReservationGuideDirectory: vi.fn() })
);

describe("getReservationGuidesAction", () => {
  beforeEach(() => {
    vi.mocked(loadReservationGuideDirectory).mockReset();
  });

  it("returns guides without recording an error", async () => {
    const guides = [
      {
        id: RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
        name: RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME,
      },
    ];
    vi.mocked(
      loadReservationGuideDirectory
    ).mockResolvedValue({
      guides,
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
    });

    await expect(
      getReservationGuidesAction()
    ).resolves.toEqual({
      guides,
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
    });
    expect(
      loadReservationGuideDirectory
    ).toHaveBeenCalledOnce();
  });

  it("returns the typed failure result from the loader", async () => {
    vi.mocked(
      loadReservationGuideDirectory
    ).mockResolvedValue({
      code: RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE,
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
    });

    await expect(
      getReservationGuidesAction()
    ).resolves.toEqual({
      code: RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE,
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
    });
    expect(
      loadReservationGuideDirectory
    ).toHaveBeenCalledOnce();
  });
});
