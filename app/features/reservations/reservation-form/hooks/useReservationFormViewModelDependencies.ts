import { useRouter } from "next/navigation";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { createReservationFormSubmitHandler } from "../utils/createReservationFormSubmitHandler";
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
  const handleSubmit = createReservationFormSubmitHandler({
    ...resources.equipment,
    resolvedDurationHours: resources.resolvedDurationHours,
    setFieldError: resources.state.submission.setFieldError,
    submitReservation:
      resources.state.submission.submitReservation,
    values: resources.state.fields.values,
  });
  return { handleSubmit, handlers, resources, router };
};
