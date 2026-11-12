import { useRouter } from "next/navigation";
import type { ExtraListViewModel } from "../models/ExtraListViewModel.interface";
import type { ExtraListViewModelProps } from "../models/ExtraListViewModelProps.interface";
import { buildExtraCardViewModel } from "../utils/buildExtraCardViewModel";
import { resolveExtraListViewState } from "../utils/resolveExtraListViewState";
import { useExtraCardActions } from "./useExtraCardActions";

export const useExtraListViewModel = ({
  extras,
  fetchFailed,
}: ExtraListViewModelProps): ExtraListViewModel => {
  const router = useRouter();
  const cardActions = useExtraCardActions();

  const onRetry = (): void => {
    router.refresh();
  };

  return {
    cards: extras.map((extra) =>
      buildExtraCardViewModel(extra, cardActions)
    ),
    onRetry,
    viewState: resolveExtraListViewState(
      fetchFailed,
      extras.length
    ),
  };
};
