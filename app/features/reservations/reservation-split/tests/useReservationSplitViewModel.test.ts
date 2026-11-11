import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import { splitReservationAction } from "../actions/splitReservationAction";
import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import { useReservationSplitViewModel } from "../hooks/useReservationSplitViewModel";
import {
  EXPECTED_SPLIT,
  SPLIT_DEPARTURE_ID,
} from "./ReservationSplit.constants";
import { SPLIT_DEPARTURE_CODE } from "./splitReservation.constants";

vi.mock("../actions/splitReservationAction", () => ({
  splitReservationAction: vi.fn(),
}));

const VALID_TIME = "15:00";
const QUANTITY_ID = EXPECTED_SPLIT.items[1].id;
const EXTRA_DEPARTURES = 2;
const MIDDLE = 1;

const renderViewModel = () =>
  renderHook(() =>
    useReservationSplitViewModel(EXPECTED_SPLIT)
  );

const submitForm = (
  result: ReturnType<typeof renderViewModel>["result"]
): Promise<void> =>
  act(() => {
    result.current.handleSubmit(buildFormSubmitEvent());
    return Promise.resolve();
  });

describe("useReservationSplitViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends nothing and shows the errors while the draft is invalid", async () => {
    const { result } = renderViewModel();

    await submitForm(result);

    expect(splitReservationAction).not.toHaveBeenCalled();
    expect(result.current.errors.departures[0].time).toBe(
      RESERVATION_SPLIT_FEEDBACK_COPY.TIME_REQUIRED
    );
  });

  it("clears the time error when the time is edited", async () => {
    const { result } = renderViewModel();
    await submitForm(result);
    const { key } = result.current.state.drafts[0];

    act(() => result.current.setTime(key, VALID_TIME));

    expect(
      result.current.errors.departures[0].time
    ).toBeUndefined();
  });

  it("sends a valid draft and exposes the created departures", async () => {
    vi.mocked(splitReservationAction).mockResolvedValue({
      departures: [
        {
          code: SPLIT_DEPARTURE_CODE,
          reservationId: SPLIT_DEPARTURE_ID,
        },
      ],
      ok: true,
    });
    const { result } = renderViewModel();
    const { key } = result.current.state.drafts[0];
    act(() => result.current.setTime(key, VALID_TIME));
    act(() =>
      result.current.stepQuantity(
        key,
        EXPECTED_SPLIT.items[1].id,
        1
      )
    );

    await submitForm(result);

    expect(splitReservationAction).toHaveBeenCalledTimes(1);
    expect(result.current.createdDepartures).toHaveLength(
      1
    );
    expect(result.current.isSubmitDisabled).toBe(true);
  });

  it("disables the submit and keeps the values after a stale result", async () => {
    vi.mocked(splitReservationAction).mockResolvedValue({
      errors: { departures: [] },
      formError: RESERVATION_SPLIT_FEEDBACK_COPY.STALE,
      ok: false,
    });
    const { result } = renderViewModel();
    const { key } = result.current.state.drafts[0];
    act(() => result.current.setTime(key, VALID_TIME));
    act(() =>
      result.current.stepQuantity(
        key,
        EXPECTED_SPLIT.items[1].id,
        1
      )
    );
    await submitForm(result);
    await submitForm(result);

    expect(splitReservationAction).toHaveBeenCalledTimes(1);
    expect(result.current.isSubmitDisabled).toBe(true);
    expect(result.current.state.drafts[0].time).toBe(
      VALID_TIME
    );
  });

  it("ignores removing a departure while the submit is pending", () => {
    vi.mocked(splitReservationAction).mockReturnValue(
      new Promise(() => undefined)
    );
    const { result } = renderHook(() =>
      useReservationSplitViewModel(EXPECTED_SPLIT)
    );
    for (let added = 0; added < EXTRA_DEPARTURES; added++) {
      act(() => result.current.addDeparture());
    }
    result.current.state.drafts.forEach(({ key }) => {
      act(() => result.current.setTime(key, VALID_TIME));
      act(() =>
        result.current.stepQuantity(key, QUANTITY_ID, 1)
      );
    });
    const sentCount = result.current.state.drafts.length;
    act(() =>
      result.current.handleSubmit(buildFormSubmitEvent())
    );

    act(() =>
      result.current.removeDeparture(
        result.current.state.drafts[MIDDLE].key
      )
    );

    expect(result.current.state.drafts).toHaveLength(
      sentCount
    );
  });
});
