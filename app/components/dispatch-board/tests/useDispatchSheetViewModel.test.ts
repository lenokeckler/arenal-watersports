import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DISPATCH_GROUP_STATUS } from "../constants/DispatchSheet.constants";
import {
  DISPATCH_SHEET_COPY,
  DISPATCH_SHEET_PHASE,
} from "../constants/DispatchSheetCopy.constants";
import { useDispatchSheetViewModel } from "../hooks/useDispatchSheetViewModel";
import { DISPATCH_INPUT_FIXTURE } from "./DispatchSheetTest.constants";
import {
  DISPATCH_FIXTURE_UNKNOWN_CATEGORY,
  MOTOR_GROUP_FIXTURE,
  UNIT_GROUP_FIXTURE,
} from "./DispatchSheetGroup.fixtures";

const { loadDispatchSheetMock, submitDispatchGroupMock } =
  vi.hoisted(() => ({
    loadDispatchSheetMock: vi.fn(),
    submitDispatchGroupMock: vi.fn(),
  }));

vi.mock("../actions/loadDispatchSheet", () => ({
  loadDispatchSheet: loadDispatchSheetMock,
}));

vi.mock("../actions/submitDispatchGroup", () => ({
  submitDispatchGroup: submitDispatchGroupMock,
}));

const SELECTION = {
  departureAt: DISPATCH_INPUT_FIXTURE.DEPARTURE_AT,
  readings: [],
  returnsAt: DISPATCH_INPUT_FIXTURE.RETURNS_AT,
  unitIds: [DISPATCH_INPUT_FIXTURE.UNIT_ID],
};

const renderSheet = async (initialCategoryId?: string) => {
  const onDispatched = vi.fn();
  const view = renderHook(() =>
    useDispatchSheetViewModel({
      initialCategoryId,
      onDispatched,
      reservationId: DISPATCH_INPUT_FIXTURE.RESERVATION_ID,
    })
  );

  await waitFor(() =>
    expect(view.result.current.phase).not.toBe(
      DISPATCH_SHEET_PHASE.LOADING
    )
  );

  return { onDispatched, view };
};

describe("useDispatchSheetViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens the only category without asking to choose", async () => {
    loadDispatchSheetMock.mockResolvedValue([
      UNIT_GROUP_FIXTURE,
    ]);

    const { view } = await renderSheet();

    expect(view.result.current.selectedGroup).toEqual(
      UNIT_GROUP_FIXTURE
    );
  });

  it("asks to choose when there are several categories", async () => {
    loadDispatchSheetMock.mockResolvedValue([
      UNIT_GROUP_FIXTURE,
      MOTOR_GROUP_FIXTURE,
    ]);

    const { view } = await renderSheet();

    expect(view.result.current.selectedGroup).toBeNull();

    act(() => {
      view.result.current.handleSelectGroup(
        MOTOR_GROUP_FIXTURE.categoryId
      );
    });

    expect(view.result.current.selectedGroup).toEqual(
      MOTOR_GROUP_FIXTURE
    );
  });

  it("opens straight on the category chosen from the board", async () => {
    loadDispatchSheetMock.mockResolvedValue([
      UNIT_GROUP_FIXTURE,
      MOTOR_GROUP_FIXTURE,
    ]);

    const { view } = await renderSheet(
      MOTOR_GROUP_FIXTURE.categoryId
    );

    expect(view.result.current.selectedGroup).toEqual(
      MOTOR_GROUP_FIXTURE
    );
  });

  it("falls back to the chooser when the chosen category has nothing left", async () => {
    loadDispatchSheetMock.mockResolvedValue([
      UNIT_GROUP_FIXTURE,
      MOTOR_GROUP_FIXTURE,
    ]);

    const { view } = await renderSheet(
      DISPATCH_FIXTURE_UNKNOWN_CATEGORY
    );

    expect(view.result.current.selectedGroup).toBeNull();
  });

  it("closes the sheet when the last category is dispatched", async () => {
    loadDispatchSheetMock
      .mockResolvedValueOnce([UNIT_GROUP_FIXTURE])
      .mockResolvedValueOnce([]);
    submitDispatchGroupMock.mockResolvedValue({
      status: DISPATCH_GROUP_STATUS.DISPATCHED,
    });
    const { onDispatched, view } = await renderSheet();

    await act(async () => {
      await view.result.current.handleSubmitGroup(
        SELECTION
      );
    });

    expect(submitDispatchGroupMock).toHaveBeenCalledWith({
      ...SELECTION,
      categoryId: UNIT_GROUP_FIXTURE.categoryId,
      reservationId: DISPATCH_INPUT_FIXTURE.RESERVATION_ID,
    });
    expect(onDispatched).toHaveBeenCalledOnce();
  });

  it("keeps the sheet open while another category is pending", async () => {
    loadDispatchSheetMock
      .mockResolvedValueOnce([
        UNIT_GROUP_FIXTURE,
        MOTOR_GROUP_FIXTURE,
      ])
      .mockResolvedValueOnce([MOTOR_GROUP_FIXTURE]);
    submitDispatchGroupMock.mockResolvedValue({
      status: DISPATCH_GROUP_STATUS.DISPATCHED,
    });
    const { onDispatched, view } = await renderSheet();

    act(() => {
      view.result.current.handleSelectGroup(
        UNIT_GROUP_FIXTURE.categoryId
      );
    });
    await act(async () => {
      await view.result.current.handleSubmitGroup(
        SELECTION
      );
    });

    expect(onDispatched).not.toHaveBeenCalled();
    expect(view.result.current.groups).toEqual([
      MOTOR_GROUP_FIXTURE,
    ]);
  });

  it("explains that a unit is no longer available", async () => {
    loadDispatchSheetMock.mockResolvedValue([
      UNIT_GROUP_FIXTURE,
    ]);
    submitDispatchGroupMock.mockResolvedValue({
      status: DISPATCH_GROUP_STATUS.UNAVAILABLE,
    });
    const { onDispatched, view } = await renderSheet();

    await act(async () => {
      await view.result.current.handleSubmitGroup(
        SELECTION
      );
    });

    expect(view.result.current.errorMessage).toBe(
      DISPATCH_SHEET_COPY.UNITS_UNAVAILABLE
    );
    expect(onDispatched).not.toHaveBeenCalled();
  });

  it("explains that a reading was refused", async () => {
    loadDispatchSheetMock.mockResolvedValue([
      UNIT_GROUP_FIXTURE,
    ]);
    submitDispatchGroupMock.mockResolvedValue({
      status: DISPATCH_GROUP_STATUS.INVALID_READINGS,
    });
    const { onDispatched, view } = await renderSheet();

    await act(async () => {
      await view.result.current.handleSubmitGroup(
        SELECTION
      );
    });

    expect(view.result.current.errorMessage).toBe(
      DISPATCH_SHEET_COPY.READINGS_INVALID
    );
    expect(onDispatched).not.toHaveBeenCalled();
  });

  it("says the dispatch failed when the server raises", async () => {
    loadDispatchSheetMock.mockResolvedValue([
      UNIT_GROUP_FIXTURE,
    ]);
    submitDispatchGroupMock.mockRejectedValue(
      new Error("boom")
    );
    const { view } = await renderSheet();

    await act(async () => {
      await view.result.current.handleSubmitGroup(
        SELECTION
      );
    });

    expect(view.result.current.errorMessage).toBe(
      DISPATCH_SHEET_COPY.SUBMIT_ERROR
    );
    expect(view.result.current.isSubmitting).toBe(false);
  });

  it("reports a sheet that could not be loaded", async () => {
    loadDispatchSheetMock.mockRejectedValue(
      new Error("boom")
    );

    const { view } = await renderSheet();

    expect(view.result.current.phase).toBe(
      DISPATCH_SHEET_PHASE.FAILED
    );
  });
});
