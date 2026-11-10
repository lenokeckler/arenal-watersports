import { useRouter } from "next/navigation";
import type { ExtraListViewModel } from "../models/ExtraListViewModel.interface";
import type { ExtraListViewModelProps } from "../models/ExtraListViewModelProps.interface";
import { buildExtraCardViewModel } from "../utils/buildExtraCardViewModel";
import { resolveExtraListViewState } from "../utils/resolveExtraListViewState";

export const useExtraListViewModel = ({
  extras,
  fetchFailed,
}: ExtraListViewModelProps): ExtraListViewModel => {
  const router = useRouter();

  const onRetry = (): void => {
    router.refresh();
  };

  return {
    cards: extras.map(buildExtraCardViewModel),
    onRetry,
    viewState: resolveExtraListViewState(
      fetchFailed,
      extras.length
    ),
  };
};
