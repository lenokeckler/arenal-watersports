import {
  Link,
  Section,
  Text,
  Title,
} from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "../constants/InventoryDomId.constants";
import type { InventoryExpiryAlertsProps } from "../models/InventoryExpiryAlertsProps.interface";
import {
  INVENTORY_ALERT_DETAIL_CLASS,
  INVENTORY_ALERT_LINK_CLASS,
  INVENTORY_ALERT_LIST_CLASS,
  INVENTORY_ALERT_NAME_CLASS,
  INVENTORY_OVERVIEW_SECTION_CLASS,
  INVENTORY_OVERVIEW_SECTION_TITLE_CLASS,
} from "../styles/InventoryOverview.styles";
import { formatInventoryExpiryDate } from "../utils/formatInventoryExpiryDate";

const InventoryExpiryAlerts = ({
  alerts,
}: InventoryExpiryAlertsProps): React.JSX.Element | null =>
  alerts.length === 0 ? null : (
    <Section
      ariaLabel={INVENTORY_DOM_ID.EXPIRY_ALERTS}
      className={INVENTORY_OVERVIEW_SECTION_CLASS}
    >
      <Title
        id={INVENTORY_DOM_ID.EXPIRY_ALERTS}
        variant={TitleVariant.SECONDARY}
        className={INVENTORY_OVERVIEW_SECTION_TITLE_CLASS}
        text={INVENTORY_COPY.EXPIRY_ALERTS_TITLE}
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
                {INVENTORY_COPY.EXPIRY_ALERT(
                  formatInventoryExpiryDate(
                    alert.expiryDate
                  ),
                  alert.daysToExpiry,
                  alert.isExpired,
                  alert.anticipationDays
                )}
              </Text>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );

export default InventoryExpiryAlerts;
