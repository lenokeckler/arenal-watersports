import { UNIT_LIST_VIEW_STATE } from "../constants/UnitListViewState.constants";
import type { UnitListBodyProps } from "../models/UnitListBodyProps.interface";
import UnitListCards from "./UnitListCards";
import UnitListEmptyState from "./UnitListEmptyState";
import UnitListErrorState from "./UnitListErrorState";

const UnitListBody = ({
  cards,
  onRetry,
  viewState,
}: UnitListBodyProps): React.JSX.Element => {
  if (viewState === UNIT_LIST_VIEW_STATE.ERROR) {
    return <UnitListErrorState onRetry={onRetry} />;
  }

  if (viewState === UNIT_LIST_VIEW_STATE.EMPTY) {
    return <UnitListEmptyState />;
  }

  return <UnitListCards cards={cards} />;
};

export default UnitListBody;
