"use client";

import {
  Button,
  MaterialIcon,
  Text,
  Title,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  ARIA_ROLE,
  BUTTON,
  TitleVariant,
} from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitsErrorProps } from "../models/CategoryUnitsErrorProps.interface";
import {
  CATEGORY_UNITS_PAGE_CLASS,
  CATEGORY_UNITS_TITLE_CLASS,
} from "../styles/CategoryUnits.styles";
import {
  CATEGORY_UNITS_ERROR_BODY_CLASS,
  CATEGORY_UNITS_ERROR_BUTTON_CLASS,
  CATEGORY_UNITS_ERROR_CLASS,
  CATEGORY_UNITS_ERROR_ICON_CLASS,
  CATEGORY_UNITS_ERROR_TEXT_CLASS,
  CATEGORY_UNITS_ERROR_TITLE_CLASS,
} from "../styles/CategoryUnitsState.styles";
import CategoryUnitsBackLink from "./CategoryUnitsBackLink";

const CategoryUnitsError = ({
  reset,
}: CategoryUnitsErrorProps): React.JSX.Element => (
  <main className={CATEGORY_UNITS_PAGE_CLASS}>
    <CategoryUnitsBackLink />
    <Title
      variant={TitleVariant.PRIMARY}
      text={CATEGORY_UNITS_COPY.FALLBACK_TITLE}
      className={CATEGORY_UNITS_TITLE_CLASS}
    />
    <div
      role={ARIA_ROLE.ALERT}
      className={CATEGORY_UNITS_ERROR_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ERROR}
        className={CATEGORY_UNITS_ERROR_ICON_CLASS}
      />
      <div className={CATEGORY_UNITS_ERROR_TEXT_CLASS}>
        <Text className={CATEGORY_UNITS_ERROR_TITLE_CLASS}>
          {CATEGORY_UNITS_COPY.ERROR_TITLE}
        </Text>
        <Text className={CATEGORY_UNITS_ERROR_BODY_CLASS}>
          {CATEGORY_UNITS_COPY.ERROR_BODY}
        </Text>
      </div>
    </div>
    <Button
      variant={BUTTON.PRIMARY}
      className={CATEGORY_UNITS_ERROR_BUTTON_CLASS}
      onClick={reset}
    >
      {CATEGORY_UNITS_COPY.RETRY}
    </Button>
  </main>
);

export default CategoryUnitsError;
