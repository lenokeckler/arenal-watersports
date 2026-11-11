import { EXTRA_LIST_VIEW_STATE } from "../constants/ExtraListViewState.constants";
import type { ExtraListBodyProps } from "../models/ExtraListBodyProps.interface";
import ExtraListCards from "./ExtraListCards";
import ExtraListEmptyState from "./ExtraListEmptyState";
import ExtraListErrorState from "./ExtraListErrorState";

const ExtraListBody = ({
  cards,
  onRetry,
  viewState,
}: ExtraListBodyProps): React.JSX.Element => {
  if (viewState === EXTRA_LIST_VIEW_STATE.ERROR) {
    return <ExtraListErrorState onRetry={onRetry} />;
  }

  if (viewState === EXTRA_LIST_VIEW_STATE.EMPTY) {
    return <ExtraListEmptyState />;
  }

  return <ExtraListCards cards={cards} />;
};

export default ExtraListBody;
