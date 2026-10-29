import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CALENDAR_PREFERENCE,
  CALENDAR_PREFERENCE_COPY,
  CALENDAR_VIEW,
} from "@/app/constants";
import {
  getCalendarPreferenceError,
  readCalendarPreference,
  writeCalendarPreference,
} from "../services/calendarPreference";
import calendarReducer, {
  calendarActions,
} from "../store/calendarSlice";
import { CALENDAR_FIXTURE } from "./Calendar.constants";
import {
  CALENDAR_STORAGE_METHOD,
  STORAGE_ERROR_DETAIL,
} from "./CalendarPreference.constants";

describe("calendar preference", () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it.each(Object.values(CALENDAR_VIEW))(
    "roundtrips saved view %s",
    (view) => {
      writeCalendarPreference(window.localStorage, view);

      expect(
        readCalendarPreference(window.localStorage)
      ).toBe(view);
    }
  );

  it("returns null when the preference is absent", () => {
    expect(
      readCalendarPreference(window.localStorage)
    ).toBeNull();
  });

  it("rejects a corrupted preference", () => {
    window.localStorage.setItem(
      CALENDAR_PREFERENCE.STORAGE_KEY,
      CALENDAR_FIXTURE.invalidInstant
    );

    expect(
      readCalendarPreference(window.localStorage)
    ).toBeNull();
  });

  it("returns safe copy when storage fails", () => {
    const error = new Error(STORAGE_ERROR_DETAIL);

    const message = getCalendarPreferenceError(error);

    expect(message).toBe(CALENDAR_PREFERENCE_COPY.ERROR);
    expect(message).not.toContain(STORAGE_ERROR_DETAIL);
  });

  it.each(Object.values(CALENDAR_STORAGE_METHOD))(
    "propagates storage errors from %s",
    (method) => {
      const error = new Error(
        CALENDAR_PREFERENCE_COPY.ERROR
      );
      vi.spyOn(
        Storage.prototype,
        method
      ).mockImplementation(() => {
        throw error;
      });

      expect(() =>
        method === CALENDAR_STORAGE_METHOD.GET
          ? readCalendarPreference(window.localStorage)
          : writeCalendarPreference(
              window.localStorage,
              CALENDAR_VIEW.MONTH
            )
      ).toThrow(error);
    }
  );

  it("changes the selected view without changing the anchor or preference error", () => {
    const previous = {
      anchor: CALENDAR_FIXTURE.leapEnd,
      selectedView: CALENDAR_VIEW.DAY,
      preferenceError: CALENDAR_PREFERENCE_COPY.ERROR,
    };

    const result = calendarReducer(
      previous,
      calendarActions.setSelectedView(CALENDAR_VIEW.YEAR)
    );

    expect(result).toEqual({
      ...previous,
      selectedView: CALENDAR_VIEW.YEAR,
    });
    expect(previous.selectedView).toBe(CALENDAR_VIEW.DAY);
  });

  it("changes the anchor without changing the selected view or preference error", () => {
    const previous = {
      anchor: CALENDAR_FIXTURE.leapEnd,
      selectedView: CALENDAR_VIEW.MONTH,
      preferenceError: CALENDAR_PREFERENCE_COPY.ERROR,
    };

    const result = calendarReducer(
      previous,
      calendarActions.setAnchor(null)
    );

    expect(result).toEqual({
      ...previous,
      anchor: null,
    });
  });

  it("changes the preference error without changing the anchor or selected view", () => {
    const previous = {
      anchor: CALENDAR_FIXTURE.leapEnd,
      selectedView: CALENDAR_VIEW.MONTH,
      preferenceError: null,
    };

    const result = calendarReducer(
      previous,
      calendarActions.setPreferenceError(
        CALENDAR_PREFERENCE_COPY.ERROR
      )
    );

    expect(result).toEqual({
      ...previous,
      preferenceError: CALENDAR_PREFERENCE_COPY.ERROR,
    });
  });
});
