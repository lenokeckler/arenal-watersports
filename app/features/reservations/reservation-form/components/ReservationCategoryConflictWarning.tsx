import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import SectionTitle from "@/app/components/section-title/SectionTitle";
import Text from "@/app/components/text/Text";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationCategoryConflictWarningProps } from "../models/ReservationCategoryConflictWarningProps.interface";
import {
  RESERVATION_CATEGORY_CONFLICT_WARNING_CLASS,
  RESERVATION_CATEGORY_CONFLICT_WARNING_DESCRIPTION_CLASS,
  RESERVATION_CATEGORY_CONFLICT_WARNING_ITEM_CLASS,
  RESERVATION_CATEGORY_CONFLICT_WARNING_LIST_CLASS,
  RESERVATION_CATEGORY_CONFLICT_WARNING_LOADING_CLASS,
  RESERVATION_CATEGORY_CONFLICT_WARNING_TITLE_CLASS,
} from "../styles/ReservationCategoryConflictWarning.styles";

const ReservationCategoryConflictWarningStatus = ({
  viewModel,
}: ReservationCategoryConflictWarningProps): NullableRef<React.JSX.Element> => {
  if (viewModel.isLoading) {
    return (
      <Text
        className={
          RESERVATION_CATEGORY_CONFLICT_WARNING_LOADING_CLASS
        }
        role={ARIA_ROLE.STATUS}
      >
        {
          RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_LOADING
        }
      </Text>
    );
  }

  if (viewModel.hasError) {
    return (
      <Text
        className={
          RESERVATION_CATEGORY_CONFLICT_WARNING_CLASS
        }
        role={ARIA_ROLE.ALERT}
      >
        {
          RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_ERROR
        }
      </Text>
    );
  }

  return null;
};

const ReservationCategoryConflictWarningIntroduction =
  (): React.JSX.Element => (
    <>
      <SectionTitle
        className={
          RESERVATION_CATEGORY_CONFLICT_WARNING_TITLE_CLASS
        }
        text={
          RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_TITLE
        }
      />
      <Text
        className={
          RESERVATION_CATEGORY_CONFLICT_WARNING_DESCRIPTION_CLASS
        }
      >
        {
          RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_DESCRIPTION
        }
      </Text>
    </>
  );

const ReservationCategoryConflictWarningList = ({
  viewModel,
}: ReservationCategoryConflictWarningProps): React.JSX.Element => (
  <ul
    className={
      RESERVATION_CATEGORY_CONFLICT_WARNING_LIST_CLASS
    }
  >
    {viewModel.items.map((item) => (
      <li
        className={
          RESERVATION_CATEGORY_CONFLICT_WARNING_ITEM_CLASS
        }
        key={item.id}
      >
        <Text bold>{item.code}</Text>
        <Text>{item.customerName}</Text>
        <Text>{item.intervalLabel}</Text>
      </li>
    ))}
  </ul>
);

const ReservationCategoryConflictWarningPanel = ({
  viewModel,
}: ReservationCategoryConflictWarningProps): React.JSX.Element => (
  <div
    aria-label={
      RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_TITLE
    }
    className={RESERVATION_CATEGORY_CONFLICT_WARNING_CLASS}
    role={ARIA_ROLE.ALERT}
  >
    <ReservationCategoryConflictWarningIntroduction />
    <ReservationCategoryConflictWarningList
      viewModel={viewModel}
    />
  </div>
);

const ReservationCategoryConflictWarning = ({
  viewModel,
}: ReservationCategoryConflictWarningProps): NullableRef<React.JSX.Element> => {
  if (viewModel.isLoading || viewModel.hasError) {
    return (
      <ReservationCategoryConflictWarningStatus
        viewModel={viewModel}
      />
    );
  }

  if (viewModel.items.length === 0) {
    return null;
  }

  return (
    <ReservationCategoryConflictWarningPanel
      viewModel={viewModel}
    />
  );
};

export default ReservationCategoryConflictWarning;
