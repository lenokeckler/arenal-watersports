"use client";

import { useRouter } from "next/navigation";
import type { TariffListViewModel } from "../models/TariffListViewModel.interface";
import type { TariffListViewModelProps } from "../models/TariffListViewModelProps.interface";
import { buildTariffCardViewModel } from "../utils/buildTariffCardViewModel";

export const useTariffListViewModel = ({
  categories,
}: TariffListViewModelProps): TariffListViewModel => {
  const router = useRouter();

  const onRetry = (): void => {
    router.refresh();
  };

  return {
    cards: categories.map(buildTariffCardViewModel),
    onRetry,
  };
};
