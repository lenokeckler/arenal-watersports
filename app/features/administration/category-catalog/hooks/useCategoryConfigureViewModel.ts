import { useDispatch, useSelector } from "react-redux";
import {
  categoryConfigureActions,
  type AppDispatch,
  type RootState,
} from "@/app/store";
import { STORE_SLICES } from "@/app/constants";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";
import type { CategoryConfigureViewModel } from "../models/CategoryConfigureViewModel.interface";
import type { CategoryConfigureViewProps } from "../models/CategoryConfigureViewProps.interface";
import { resolveCategoryConfigureSections } from "../utils/resolveCategoryConfigureSections";
import { resolveCategoryConfigureStatusCard } from "../utils/resolveCategoryConfigureStatusCard";

export const useCategoryConfigureViewModel = ({
  configuration,
}: CategoryConfigureViewProps): CategoryConfigureViewModel => {
  const dispatch = useDispatch<AppDispatch>();
  const openSectionIds = useSelector(
    (state: RootState) =>
      state[STORE_SLICES.CATEGORY_CONFIGURE].openSectionIds
  );

  const onToggleSection = (
    sectionId: CategoryConfigureSectionId
  ): void => {
    dispatch(
      categoryConfigureActions.toggleSection(sectionId)
    );
  };

  return {
    name: configuration.name,
    statusCard:
      resolveCategoryConfigureStatusCard(configuration),
    sections: resolveCategoryConfigureSections(
      configuration,
      openSectionIds
    ),
    onToggleSection,
  };
};
