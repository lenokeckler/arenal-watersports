import { EXTERNAL_GUIDE_REGISTRATION_COPY } from "@/app/features/reservations/external-guide-registration/constants/ExternalGuideRegistrationCopy.constants";
import { EXTERNAL_GUIDE_CALENDAR_COPY } from "@/app/features/reservations/calendar/constants/ExternalGuideCalendarCopy.constants";

export const E2E_EXTERNAL_GUIDE = {
  CREATOR_NAME: "Responsable de guías E2E",
  CREATOR_PASSWORD: "GuideRegistrar.2026",
  GUIDE_NAME: "Guía externo E2E",
  EXPIRY_OFFSET_DAYS: 7,
  EXPIRED_AT: "2000-01-01T00:00:00.000Z",
  ISO_DATE_LENGTH: 10,
  MONTH_INDEX_OFFSET: 1,
  REGISTRAR_MARK: "registro_guias_externos",
  GUIDE_MARK: "guia",
  RESERVATIONS_ROLE: "reservas",
} as const;

export const E2E_EXTERNAL_GUIDE_COPY = {
  ...EXTERNAL_GUIDE_REGISTRATION_COPY,
  CREATE_LINK: EXTERNAL_GUIDE_CALENDAR_COPY.CREATE_LINK,
} as const;

export const E2E_EXTERNAL_GUIDE_SCREENSHOT_BASENAME = {
  FORM: "01-external-guide-registration-form",
  RESULT: "02-external-guide-registration-result",
} as const;
