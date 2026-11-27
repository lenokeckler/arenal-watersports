import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { reportServerError } from "@/app/services/observability";
import { DEPOSIT_RESOLUTION_OPERATION } from "../constants/DepositResolutionOperation.constants";

const RESOLUTION_PATHS = [
  PATHS.RESERVATIONS.DEPOSITS,
  PATHS.ADMINISTRATION.DEPOSITS,
  PATHS.ADMINISTRATION.INCOME,
] as const;

export const revalidateDepositResolutionPaths =
  (): void => {
    try {
      RESOLUTION_PATHS.forEach((path) =>
        revalidatePath(path)
      );
    } catch (error) {
      reportServerError(
        DEPOSIT_RESOLUTION_OPERATION.REVALIDATE,
        error
      );
    }
  };
