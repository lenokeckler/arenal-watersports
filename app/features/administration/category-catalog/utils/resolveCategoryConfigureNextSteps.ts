import { LENGTH } from "@/app/constants";
import { CATEGORY_CONFIGURE_NEXT_STEP_ID } from "../constants/CategoryConfigureNextStepId.constants";
import { CATEGORY_CONFIGURE_NEXT_STEP_STATE } from "../constants/CategoryConfigureNextStepState.constants";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import type { CategoryConfigureNextStep } from "../models/CategoryConfigureNextStep.interface";
import type { CategoryConfigureNextStepState } from "../models/CategoryConfigureNextStepState.type";
import type { CategoryConfigureNextStepsProgress } from "../models/CategoryConfigureNextStepsProgress.interface";

const resolveRequiredState = (
  isDone: boolean
): CategoryConfigureNextStepState =>
  isDone
    ? CATEGORY_CONFIGURE_NEXT_STEP_STATE.DONE
    : CATEGORY_CONFIGURE_NEXT_STEP_STATE.PENDING;

export const resolveCategoryConfigureNextSteps = ({
  behavior,
  currentQuantity,
  deposit,
  image,
}: CategoryConfiguration): CategoryConfigureNextStepsProgress => {
  const requiredSteps: CategoryConfigureNextStep[] = [
    {
      id: CATEGORY_CONFIGURE_NEXT_STEP_ID.STOCK,
      state: resolveRequiredState(
        currentQuantity > LENGTH.ZERO
      ),
    },
  ];
  const optionalSteps: CategoryConfigureNextStep[] = [];

  if (behavior.isReservable) {
    requiredSteps.push(
      {
        id: CATEGORY_CONFIGURE_NEXT_STEP_ID.DURATION,
        state: resolveRequiredState(
          Boolean(behavior.defaultDurationMinutes)
        ),
      },
      {
        id: CATEGORY_CONFIGURE_NEXT_STEP_ID.PHOTO,
        state: resolveRequiredState(
          Boolean(image.imagePath)
        ),
      }
    );
  }
  if (
    behavior.isReservable &&
    deposit.depositUsd === null &&
    deposit.depositCrc === null
  ) {
    optionalSteps.push({
      id: CATEGORY_CONFIGURE_NEXT_STEP_ID.DEPOSIT,
      state: CATEGORY_CONFIGURE_NEXT_STEP_STATE.OPTIONAL,
    });
  }

  return {
    steps: [...requiredSteps, ...optionalSteps],
    doneCount: requiredSteps.filter(
      ({ state }) =>
        state === CATEGORY_CONFIGURE_NEXT_STEP_STATE.DONE
    ).length,
    requiredCount: requiredSteps.length,
  };
};
