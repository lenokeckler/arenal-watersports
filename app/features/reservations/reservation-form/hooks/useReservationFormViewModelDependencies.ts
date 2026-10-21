import { useRouter } from "next/navigation";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { useReservationFormResources } from "./useReservationFormResources";
import { createReservationFormHandlers } from "./createReservationFormHandlers";

export const useReservationFormViewModelDependencies = (
  initialDate: string,
  categories: ReservationCategoryOption[]
) => {
  const router = useRouter();
  const resources = useReservationFormResources(
    initialDate,
    categories
  );
  const handlers = createReservationFormHandlers(resources);
  return { handlers, resources, router };
};
