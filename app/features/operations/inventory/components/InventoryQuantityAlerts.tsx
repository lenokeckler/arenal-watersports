import {
  Link,
  Section,
  Text,
  Title,
} from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "../constants/InventoryDomId.constants";
import type { InventoryQuantityAlertsProps } from "../models/InventoryQuantityAlertsProps.interface";
import {
  INVENTORY_ALERT_DETAIL_CLASS,
  INVENTORY_ALERT_LINK_CLASS,
  INVENTORY_ALERT_LIST_CLASS,
  INVENTORY_ALERT_NAME_CLASS,
  INVENTORY_OVERVIEW_SECTION_CLASS,
  INVENTORY_OVERVIEW_SECTION_TITLE_CLASS,
} from "../styles/InventoryOverview.styles";

const InventoryQuantityAlerts = ({
  alerts,
}: InventoryQuantityAlertsProps): React.JSX.Element | null =>
  alerts.length === 0 ? null : (
    <Section
      ariaLabel={INVENTORY_DOM_ID.QUANTITY_ALERTS}
      className={INVENTORY_OVERVIEW_SECTION_CLASS}
    >
      <Title
        id={INVENTORY_DOM_ID.QUANTITY_ALERTS}
        variant={TitleVariant.SECONDARY}
        className={INVENTORY_OVERVIEW_SECTION_TITLE_CLASS}
        text={INVENTORY_COPY.QUANTITY_ALERTS_TITLE}
      />
      <ul className={INVENTORY_ALERT_LIST_CLASS}>
        {alerts.map((alert) => (
          <li key={alert.categoryId}>
            <Link
              href={PATHS.OPERATIONS.INVENTORY_CATEGORY(
                alert.categoryId
              )}
              className={INVENTORY_ALERT_LINK_CLASS}
            >
              <Text className={INVENTORY_ALERT_NAME_CLASS}>
                {alert.categoryName}
              </Text>
              <Text
                className={INVENTORY_ALERT_DETAIL_CLASS}
              >
                {INVENTORY_COPY.QUANTITY_ALERT(
                  alert.available,
                  alert.minimum,
                  alert.missing
                )}
              </Text>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );

export default InventoryQuantityAlerts;
