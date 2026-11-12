import type { Metadata } from "next";
import ReservationForm from "@/app/features/reservations/reservation-form/ReservationForm";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";

export const metadata: Metadata = {
  title: RESERVATION_FORM_UI_COPY.TITLE,
};

const NewReservationPage = (): Promise<React.JSX.Element> =>
  ReservationForm();

export default NewReservationPage;
