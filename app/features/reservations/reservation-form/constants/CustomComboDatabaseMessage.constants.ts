export const CUSTOM_COMBO_DATABASE_MESSAGE = {
  CATEGORY_NOT_RESERVABLE:
    "Every custom combo category must be reservable",
  CATEGORY_QUANTITY_UNAVAILABLE:
    "Equipment category quantity is not available for reservation",
  CATEGORY_UNAVAILABLE:
    "Equipment category is not available for reservation",
  CUSTOMER_NAME_REQUIRED: "Customer name is required",
  DATE_TIME_REQUIRED:
    "A valid reservation date and time are required",
  DURATION_POSITIVE:
    "Reservation duration must be positive",
  EMPTY_SELECTION:
    "A custom combo requires equipment selections",
  EQUIPMENT_REQUIRES_TOUR:
    "Guide-only equipment requires a tour reservation",
  GUIDE_IDS_ARRAY: "Guide identifiers must be an array",
  GUIDE_IDS_UUID: "Guide identifiers must be UUID values",
  GUIDES_REQUIRE_TOUR:
    "Guides can only be assigned to tour reservations",
  INSUFFICIENT_AVAILABILITY:
    "Equipment category has insufficient availability",
  INVALID_AGREED_CRC:
    "Agreed CRC amount is invalid for the available tariff",
  INVALID_AGREED_USD:
    "Agreed USD amount is invalid for the available tariff",
  INVALID_SELECTION:
    "Custom combo equipment selections are invalid",
  NEGATIVE_TARIFF: "Individual tariffs cannot be negative",
  PEOPLE_COUNT_POSITIVE: "People count must be positive",
  REPEATED_CATEGORY:
    "Custom combo equipment categories cannot repeat",
  SELECTION_NOT_RESERVABLE:
    "Every custom combo selection must be reservable",
  TARIFF_MISSING:
    "An individual tariff is missing for a custom combo category",
  UNIT_CONFLICT:
    "Equipment unit conflicts with another reservation",
  UNIT_UNAVAILABLE:
    "Equipment unit is not available for reservation",
  WORKERS_MUST_BE_GUIDES:
    "Every assigned worker must be marked as a guide",
} as const;
