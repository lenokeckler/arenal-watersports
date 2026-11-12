import type { ReservationPostponementRefusal } from "../models/ReservationPostponementRefusal.interface";
import { RESERVATION_POSTPONEMENT_ERROR } from "./ReservationPostponementError.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as COPY } from "./ReservationPostponementFeedbackCopy.constants";

const { MESSAGE } = RESERVATION_POSTPONEMENT_ERROR;

export const RESERVATION_POSTPONEMENT_REFUSALS: ReservationPostponementRefusal[] =
  [
    {
      formError: COPY.ACCESS_REQUIRED,
      message: MESSAGE.ACCESS_REQUIRED,
    },
    {
      formError: COPY.SUBMIT_ERROR,
      message: MESSAGE.PAYLOAD_NOT_OBJECT,
    },
    {
      formError: COPY.SUBMIT_ERROR,
      message: MESSAGE.PAYLOAD_INVALID,
    },
    {
      formError: COPY.NOT_FOUND,
      message: MESSAGE.NOT_FOUND,
    },
    {
      formError: COPY.NOT_POSTPONABLE,
      message: MESSAGE.NOT_POSTPONABLE,
    },
    { formError: COPY.STALE, message: MESSAGE.STALE },
    {
      errors: { cause: COPY.CAUSE_REQUIRED },
      message: MESSAGE.CAUSE_REQUIRED,
    },
    {
      errors: { cause: COPY.CAUSE_WEATHER_ONLY },
      message: MESSAGE.WEATHER_ONLY,
    },
    {
      errors: { reason: COPY.REASON_REQUIRED },
      message: MESSAGE.REASON_REQUIRED,
    },
    {
      errors: { reason: COPY.REASON_TOO_LONG },
      message: MESSAGE.REASON_TOO_LONG,
    },
    {
      errors: { time: COPY.SCHEDULE_INVALID },
      message: MESSAGE.SCHEDULE_INVALID,
    },
    {
      errors: { date: COPY.NEW_START_NOT_LATER },
      message: MESSAGE.NEW_START_NOT_LATER,
    },
    {
      message: MESSAGE.READINGS_INCOMPLETE,
      reading: {
        fuelIn: COPY.READING_FUEL_REQUIRED,
        usageIn: COPY.READING_USAGE_INVALID,
      },
    },
    {
      formError: COPY.RELOAD_REQUIRED,
      message: MESSAGE.READINGS_MISMATCH,
    },
    {
      message: MESSAGE.FUEL_INVALID,
      reading: { fuelIn: COPY.READING_FUEL_REQUIRED },
    },
    {
      message: MESSAGE.USAGE_INVALID,
      reading: { usageIn: COPY.READING_USAGE_INVALID },
    },
    {
      message: MESSAGE.USAGE_BELOW_DEPARTURE,
      reading: {
        usageIn: COPY.READING_USAGE_BELOW_DEPARTURE,
      },
    },
    {
      formError: COPY.RELOAD_REQUIRED,
      message: MESSAGE.USAGE_BACKWARDS,
    },
    {
      formError: COPY.RELOAD_REQUIRED,
      message: MESSAGE.UNIT_NO_FUEL,
    },
    {
      formError: COPY.UNIT_UNAVAILABLE,
      message: MESSAGE.UNIT_UNAVAILABLE,
    },
    {
      formError: COPY.UNIT_UNAVAILABLE,
      message: MESSAGE.UNIT_CONFLICT,
    },
    {
      formError: COPY.UNIT_UNAVAILABLE,
      message: MESSAGE.CATEGORY_UNAVAILABLE,
    },
  ];
