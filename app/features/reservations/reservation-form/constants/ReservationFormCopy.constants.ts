import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";

export const RESERVATION_FORM_COPY = {
  [RESERVATION_FORM_FIELD.CATEGORY_ID]:
    "Seleccione el equipo que va a ocupar.",
  [RESERVATION_FORM_FIELD.CUSTOMER_NAME]:
    "Ingrese el nombre de la reserva.",
  [RESERVATION_FORM_FIELD.DATE]:
    "Ingrese una fecha válida.",
  [RESERVATION_FORM_FIELD.GUIDE_IDS]:
    "Seleccione los guías para la salida.",
  [RESERVATION_FORM_FIELD.DURATION_HOURS]:
    "Ingrese una duración positiva en horas que equivalga a minutos completos.",
  [RESERVATION_FORM_FIELD.PEOPLE_COUNT]:
    "Ingrese una cantidad entera de personas mayor que cero.",
  [RESERVATION_FORM_FIELD.QUANTITY]:
    "Ingrese una cantidad entera de equipos mayor que cero.",
  [RESERVATION_FORM_FIELD.RESERVATION_TYPE]:
    "Seleccione el tipo de salida.",
  [RESERVATION_FORM_FIELD.UNIT_ID]:
    "Seleccione una unidad disponible para la lancha.",
  [RESERVATION_FORM_FIELD.ITEMS]:
    "Seleccione al menos un equipo con una cantidad vÃ¡lida.",
  [RESERVATION_FORM_FIELD.TIME]: "Ingrese una hora válida.",
} as const;
