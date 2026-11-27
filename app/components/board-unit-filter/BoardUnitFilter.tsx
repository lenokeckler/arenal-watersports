"use client";

import {
  ARIA_CURRENT,
  BOARD_UNIT_FILTER_COPY,
  BOARD_UNIT_FILTER_ORDER,
  BOARD_UNIT_FILTER_MENU_ID,
  BOARD_UNIT_FILTER_TRIGGER_ATTRIBUTES,
  BUTTON_TYPES,
  MATERIAL_ICON_NAME,
} from "@/app/constants";
import { closeBoardUnitFilterMenu } from "@/app/utils/board-unit-filter/closeBoardUnitFilterMenu";
import { resolveBoardFilterCount } from "@/app/utils/board-unit-filter/resolveBoardFilterCount";
import { resolveBoardFilterHref } from "@/app/utils/board-unit-filter/resolveBoardFilterHref";
import MaterialIcon from "../icons/material-icon/MaterialIcon";
import Link from "../link/Link";
import InlineText from "../text/InlineText";
import type { BoardUnitFilterProps } from "./models/BoardUnitFilterProps.interface";
import {
  BOARD_UNIT_FILTER_CLASS,
  BOARD_UNIT_FILTER_MENU_CLASS,
  BOARD_UNIT_FILTER_TRIGGER_CLASS,
  BOARD_UNIT_FILTER_TRIGGER_COUNT_CLASS,
  resolveBoardUnitFilterCountClass,
  resolveBoardUnitFilterItemClass,
} from "./styles/BoardUnitFilter.styles";

const BoardUnitFilter = ({
  basePath,
  counts,
  current,
}: BoardUnitFilterProps): React.JSX.Element => (
  <div className={BOARD_UNIT_FILTER_CLASS}>
    <button
      type={BUTTON_TYPES.BUTTON}
      className={BOARD_UNIT_FILTER_TRIGGER_CLASS}
      {...BOARD_UNIT_FILTER_TRIGGER_ATTRIBUTES}
      aria-label={BOARD_UNIT_FILTER_COPY.TRIGGER_LABEL(
        BOARD_UNIT_FILTER_COPY.LABELS[current]
      )}
    >
      {BOARD_UNIT_FILTER_COPY.LABELS[current]}
      <InlineText
        className={BOARD_UNIT_FILTER_TRIGGER_COUNT_CLASS}
      >
        {resolveBoardFilterCount(counts, current)}
      </InlineText>
      <MaterialIcon name={MATERIAL_ICON_NAME.EXPAND_MORE} />
    </button>
    <nav
      id={BOARD_UNIT_FILTER_MENU_ID}
      popover="auto"
      aria-label={BOARD_UNIT_FILTER_COPY.NAV_LABEL}
      className={BOARD_UNIT_FILTER_MENU_CLASS}
    >
      {BOARD_UNIT_FILTER_ORDER.map((filter) => {
        const isCurrent = filter === current;

        return (
          <Link
            key={filter}
            href={resolveBoardFilterHref(basePath, filter)}
            onClick={closeBoardUnitFilterMenu}
            ariaCurrent={
              isCurrent ? ARIA_CURRENT.PAGE : undefined
            }
            className={resolveBoardUnitFilterItemClass(
              isCurrent
            )}
          >
            {BOARD_UNIT_FILTER_COPY.LABELS[filter]}
            <InlineText
              className={resolveBoardUnitFilterCountClass(
                isCurrent
              )}
            >
              {resolveBoardFilterCount(counts, filter)}
            </InlineText>
          </Link>
        );
      })}
    </nav>
  </div>
);

export default BoardUnitFilter;
