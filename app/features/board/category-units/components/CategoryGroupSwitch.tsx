import { Link } from "@/app/components";
import { ARIA_CURRENT, LENGTH } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { resolveBoardCategoryPath } from "@/app/utils/board-paths/resolveBoardCategoryPath";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryGroupSwitchProps } from "../models/CategoryGroupSwitchProps.interface";
import {
  CATEGORY_GROUP_SWITCH_CLASS,
  resolveCategoryGroupSwitchLinkClass,
} from "../styles/CategoryGroupSwitch.styles";

const CategoryGroupSwitch = ({
  currentCategoryId,
  members,
}: CategoryGroupSwitchProps): NullableRef<React.JSX.Element> => {
  if (members.length <= LENGTH.ONE) {
    return null;
  }

  return (
    <nav
      aria-label={CATEGORY_UNITS_COPY.GROUP_SWITCH_LABEL}
      className={CATEGORY_GROUP_SWITCH_CLASS}
    >
      {members.map((member) => {
        const isCurrent = member.id === currentCategoryId;

        return (
          <Link
            key={member.id}
            href={resolveBoardCategoryPath(member.id)}
            ariaCurrent={
              isCurrent ? ARIA_CURRENT.PAGE : undefined
            }
            className={resolveCategoryGroupSwitchLinkClass(
              isCurrent
            )}
          >
            {member.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryGroupSwitch;
