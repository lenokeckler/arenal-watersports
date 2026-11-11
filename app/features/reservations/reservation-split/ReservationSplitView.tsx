"use client";

import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { SCREEN_READER_ONLY_CLASS } from "@/app/styles/ScreenReader.styles";
import ReservationSplitActions from "./components/ReservationSplitActions";
import ReservationSplitDepartureCard from "./components/ReservationSplitDepartureCard";
import ReservationSplitLayout from "./components/ReservationSplitLayout";
import ReservationSplitOriginalCard from "./components/ReservationSplitOriginalCard";
import ReservationSplitSuccess from "./components/ReservationSplitSuccess";
import ReservationSplitUnits from "./components/ReservationSplitUnits";
import { RESERVATION_SPLIT_DRAFT } from "./constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_UI_COPY } from "./constants/ReservationSplitUiCopy.constants";
import { useReservationSplitViewModel } from "./hooks/useReservationSplitViewModel";
import type { ReservationSplitViewProps } from "./models/ReservationSplitViewProps.interface";
import {
  RESERVATION_SPLIT_ASIDE_CLASS,
  RESERVATION_SPLIT_CHARGE_NOTE_CLASS,
  RESERVATION_SPLIT_DEPARTURE_LIST_CLASS,
  RESERVATION_SPLIT_LAYOUT_CLASS,
  RESERVATION_SPLIT_MAIN_COLUMN_CLASS,
} from "./styles/ReservationSplitView.styles";

const ReservationSplitView = ({
  split,
}: ReservationSplitViewProps): React.JSX.Element => {
  const viewModel = useReservationSplitViewModel(split);

  if (viewModel.createdDepartures.length > 0) {
    return (
      <ReservationSplitLayout>
        <ReservationSplitSuccess
          createdDepartures={viewModel.createdDepartures}
        />
      </ReservationSplitLayout>
    );
  }

  return (
    <ReservationSplitLayout>
      <form
        noValidate
        autoComplete="off"
        onSubmit={viewModel.handleSubmit}
      >
        <Text
          role={ARIA_ROLE.STATUS}
          className={SCREEN_READER_ONLY_CLASS}
        >
          {viewModel.announcement}
        </Text>
        <div className={RESERVATION_SPLIT_LAYOUT_CLASS}>
          <div className={RESERVATION_SPLIT_ASIDE_CLASS}>
            <ReservationSplitOriginalCard
              split={split}
              viewModel={viewModel}
            />
            <Text
              className={
                RESERVATION_SPLIT_CHARGE_NOTE_CLASS
              }
            >
              {RESERVATION_SPLIT_UI_COPY.CHARGE_NOTE}
            </Text>
          </div>
          <div
            className={RESERVATION_SPLIT_MAIN_COLUMN_CLASS}
          >
            <ReservationSplitUnits
              split={split}
              viewModel={viewModel}
            />
            <ol
              className={
                RESERVATION_SPLIT_DEPARTURE_LIST_CLASS
              }
            >
              {viewModel.state.drafts.map(
                (draft, index) => (
                  <li key={draft.key}>
                    <ReservationSplitDepartureCard
                      departureNumber={
                        index +
                        RESERVATION_SPLIT_DRAFT.FIRST_NEW_DEPARTURE_NUMBER
                      }
                      draft={draft}
                      split={split}
                      viewModel={viewModel}
                    />
                  </li>
                )
              )}
            </ol>
            <ReservationSplitActions
              viewModel={viewModel}
            />
          </div>
        </div>
      </form>
    </ReservationSplitLayout>
  );
};

export default ReservationSplitView;
