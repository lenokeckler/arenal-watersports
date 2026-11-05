import { useRouter } from "next/navigation";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { useReservationFormResources } from "./useReservationFormResources";

export const useReservationFormViewModelDependencies = (
  initialDate: string,
  categories: ReservationCategoryOption[]
) => {
  const router = useRouter();
  const resources = useReservationFormResources(
    initialDate,
    categories
  );
  return { resources, router };
};
