import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CALENDAR_PREFERENCE,
  CALENDAR_VIEW,
} from "@/app/constants";
import {
  readCalendarPreference,
  writeCalendarPreference,
} from "../services/calendarPreference";
import calendarReducer, {
  calendarActions,
} from "../store/calendarSlice";
import { CALENDAR_FIXTURE } from "./Calendar.constants";
import { CALENDAR_STORAGE_METHOD } from "./CalendarPreference.constants";

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

  it.each(Object.values(CALENDAR_STORAGE_METHOD))(
    "propagates storage errors from %s",
    (method) => {
      const error = new Error(CALENDAR_PREFERENCE.ERROR);
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

  it("replaces calendar state without mutating the previous state", () => {
    const previous = {
      anchor: null,
      selectedView: CALENDAR_VIEW.DAY,
      preferenceError: null,
    };
    const next = {
      anchor: CALENDAR_FIXTURE.leapEnd,
      selectedView: CALENDAR_VIEW.YEAR,
      preferenceError: CALENDAR_PREFERENCE.ERROR,
    };

    const result = calendarReducer(
      previous,
      calendarActions.setCalendar(next)
    );

    expect(result).toEqual(next);
    expect(previous).toEqual({
      anchor: null,
      selectedView: CALENDAR_VIEW.DAY,
      preferenceError: null,
    });
  });
});
