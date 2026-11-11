import { RESERVATION_SPLIT_FEEDBACK_COPY } from "./ReservationSplitFeedbackCopy.constants";

export const RESERVATION_SPLIT_ERROR = {
  FORM_ERROR_LOOKUP: [
    {
      formError: RESERVATION_SPLIT_FEEDBACK_COPY.NOT_FOUND,
      message: "Reservation was not found",
    },
    {
      formError:
        RESERVATION_SPLIT_FEEDBACK_COPY.NOT_SCHEDULED,
      message: "Only scheduled reservations can be split",
    },
    {
      formError: RESERVATION_SPLIT_FEEDBACK_COPY.STALE,
      message:
        "Reservation changed since the form was loaded",
    },
    {
      formError:
        RESERVATION_SPLIT_FEEDBACK_COPY.UNIT_UNAVAILABLE,
      message:
        "Equipment unit is not available for reservation",
    },
    {
      formError:
        RESERVATION_SPLIT_FEEDBACK_COPY.UNIT_UNAVAILABLE,
      message:
        "Equipment unit conflicts with another reservation",
    },
    {
      formError:
        RESERVATION_SPLIT_FEEDBACK_COPY.CATEGORY_UNAVAILABLE,
      message:
        "Equipment category is not available for reservation",
    },
    {
      formError:
        RESERVATION_SPLIT_FEEDBACK_COPY.ORIGINAL_PEOPLE_MIN,
      message:
        "Original reservation must keep at least one person",
    },
    {
      formError:
        RESERVATION_SPLIT_FEEDBACK_COPY.ORIGINAL_EQUIPMENT_MIN,
      message: "Original reservation must keep equipment",
    },
    {
      formError:
        RESERVATION_SPLIT_FEEDBACK_COPY.RELOAD_REQUIRED,
      message:
        "Split equipment does not belong to the reservation",
    },
    {
      formError:
        RESERVATION_SPLIT_FEEDBACK_COPY.RELOAD_REQUIRED,
      message: "Split equipment quantity is not valid",
    },
  ],
  INVALID_TIME_MESSAGE:
    "A valid reservation date and time are required",
  OPERATION: {
    MISSING_DEPARTURES:
      "split reservation returned no departures",
    READ: "read reservation split",
    SPLIT: "split reservation",
  },
} as const;
