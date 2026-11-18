import { formatCostaRicaTime } from "@/app/components/dispatch-board/utils/formatCostaRicaTime";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitInfoDetailsProps } from "../models/CategoryUnitInfoDetailsProps.interface";
import {
  CATEGORY_UNIT_INFO_LIST_CLASS,
  CATEGORY_UNIT_INFO_TERM_CLASS,
  CATEGORY_UNIT_INFO_VALUE_CLASS,
} from "../styles/CategoryUnitSheets.styles";

const CategoryUnitInfoDetails = ({
  isReadOnly,
  occupancy,
}: CategoryUnitInfoDetailsProps): React.JSX.Element => (
  <dl className={CATEGORY_UNIT_INFO_LIST_CLASS}>
    <dt className={CATEGORY_UNIT_INFO_TERM_CLASS}>
      {CATEGORY_UNITS_COPY.INFO_CUSTOMER}
    </dt>
    <dd className={CATEGORY_UNIT_INFO_VALUE_CLASS}>
      {occupancy.customerName}
    </dd>
    <dt className={CATEGORY_UNIT_INFO_TERM_CLASS}>
      {CATEGORY_UNITS_COPY.INFO_PEOPLE}
    </dt>
    <dd className={CATEGORY_UNIT_INFO_VALUE_CLASS}>
      {occupancy.peopleCount}
    </dd>
    {isReadOnly && (
      <>
        <dt className={CATEGORY_UNIT_INFO_TERM_CLASS}>
          {CATEGORY_UNITS_COPY.INFO_DEPARTED}
        </dt>
        <dd className={CATEGORY_UNIT_INFO_VALUE_CLASS}>
          {formatCostaRicaTime(occupancy.dispatchedAt)}
        </dd>
        <dt className={CATEGORY_UNIT_INFO_TERM_CLASS}>
          {CATEGORY_UNITS_COPY.INFO_RETURNS}
        </dt>
        <dd className={CATEGORY_UNIT_INFO_VALUE_CLASS}>
          {formatCostaRicaTime(occupancy.returnsAt)}
        </dd>
        <dt className={CATEGORY_UNIT_INFO_TERM_CLASS}>
          {CATEGORY_UNITS_COPY.INFO_RADIO}
        </dt>
        <dd className={CATEGORY_UNIT_INFO_VALUE_CLASS}>
          {occupancy.radioChannel === null
            ? CATEGORY_UNITS_COPY.INFO_RADIO_NONE
            : CATEGORY_UNITS_COPY.INFO_RADIO_CHANNEL(
                occupancy.radioChannel
              )}
        </dd>
      </>
    )}
  </dl>
);

export default CategoryUnitInfoDetails;
