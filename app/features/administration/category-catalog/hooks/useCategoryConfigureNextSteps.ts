import { useDispatch } from "react-redux";
import { DOCUMENT } from "@/app/constants";
import {
  categoryConfigureActions,
  type AppDispatch,
} from "@/app/store";
import type { NullableRef } from "@/app/types";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_NEXT_STEP_SECTION } from "../constants/CategoryConfigureNextStepSection.constants";
import {
  CATEGORY_CONFIGURE_NEXT_STEP_COPY,
  CATEGORY_CONFIGURE_NEXT_STEPS_COPY,
} from "../constants/CategoryConfigureNextStepsCopy.constants";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import type { CategoryConfigureNextStepId } from "../models/CategoryConfigureNextStepId.type";
import type { CategoryConfigureNextStepsProps } from "../models/CategoryConfigureNextStepsProps.interface";
import { resolveCategoryConfigureNextSteps } from "../utils/resolveCategoryConfigureNextSteps";
import { resolveCategoryConfigureSectionAnchorId } from "../utils/resolveCategoryConfigureSectionAnchorId";

export const useCategoryConfigureNextSteps = (
  configuration: CategoryConfiguration
): NullableRef<CategoryConfigureNextStepsProps> => {
  const dispatch = useDispatch<AppDispatch>();
  const { steps, doneCount, requiredCount } =
    resolveCategoryConfigureNextSteps(configuration);

  if (doneCount === requiredCount) {
    return null;
  }

  const onAction = (
    stepId: CategoryConfigureNextStepId
  ): void => {
    const sectionId =
      CATEGORY_CONFIGURE_NEXT_STEP_SECTION[stepId];
    dispatch(
      categoryConfigureActions.openSections([sectionId])
    );
    document
      .getElementById(
        resolveCategoryConfigureSectionAnchorId(sectionId)
      )
      ?.scrollIntoView({
        behavior: DOCUMENT.SMOOTH,
        block: DOCUMENT.START,
      });
  };

  return {
    title: CATEGORY_CONFIGURE_NEXT_STEPS_COPY.TITLE,
    progress: CATEGORY_CONFIGURE_NEXT_STEPS_COPY.PROGRESS(
      doneCount,
      requiredCount
    ),
    body: configuration.behavior.isReservable
      ? CATEGORY_CONFIGURE_NEXT_STEPS_COPY.BODY_RESERVABLE(
          configuration.name
        )
      : CATEGORY_CONFIGURE_NEXT_STEPS_COPY.BODY_INTERNAL(
          configuration.name
        ),
    steps: steps.map(({ id, state }) => {
      const { action, help, title } =
        CATEGORY_CONFIGURE_NEXT_STEP_COPY[id];

      return {
        id,
        state,
        title,
        help,
        action,
        actionLabel:
          CATEGORY_CONFIGURE_NEXT_STEPS_COPY.ACTION_LABEL(
            action,
            title
          ),
        optionalLabel:
          CATEGORY_CONFIGURE_COPY.BADGE_OPTIONAL,
        onAction,
      };
    }),
  };
};
