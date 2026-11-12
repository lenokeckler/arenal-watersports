"use client";

import { Button, Text, Title } from "@/app/components";
import {
  ARIA_ROLE,
  BUTTON,
  TitleVariant,
} from "@/app/constants";
import { INVENTORY_COPY } from "./constants/InventoryCopy.constants";
import type { InventoryErrorViewProps } from "./models/InventoryErrorViewProps.interface";
import {
  INVENTORY_ERROR_BUTTON_CLASS,
  INVENTORY_ERROR_DESCRIPTION_CLASS,
  INVENTORY_ERROR_TITLE_CLASS,
  INVENTORY_ERROR_WRAPPER_CLASS,
} from "./styles/InventoryError.styles";

const InventoryErrorView = ({
  reset,
}: InventoryErrorViewProps): React.JSX.Element => (
  <main className={INVENTORY_ERROR_WRAPPER_CLASS}>
    <Title
      variant={TitleVariant.PRIMARY}
      className={INVENTORY_ERROR_TITLE_CLASS}
      text={INVENTORY_COPY.LOAD_ERROR_TITLE}
    />
    <Text
      className={INVENTORY_ERROR_DESCRIPTION_CLASS}
      role={ARIA_ROLE.ALERT}
    >
      {INVENTORY_COPY.LOAD_ERROR_DESCRIPTION}
    </Text>
    <Button
      variant={BUTTON.PRIMARY}
      className={INVENTORY_ERROR_BUTTON_CLASS}
      onClick={reset}
    >
      {INVENTORY_COPY.RETRY}
    </Button>
  </main>
);

export default InventoryErrorView;
