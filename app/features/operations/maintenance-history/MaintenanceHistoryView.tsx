import UnorderedList from "@/app/components/list/UnorderedList";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import MaintenanceHistoryCard from "./components/MaintenanceHistoryCard";
import MaintenanceHistoryPagination from "./components/MaintenanceHistoryPagination";
import {
  MAINTENANCE_HISTORY_COPY,
  MAINTENANCE_HISTORY_HEADING_ID,
} from "./constants/MaintenanceHistoryCopy.constants";
import type { MaintenanceHistoryViewProps } from "./models/MaintenanceHistoryViewProps.interface";
import {
  MAINTENANCE_HISTORY_CLASS,
  MAINTENANCE_HISTORY_HEADING_CLASS,
  MAINTENANCE_HISTORY_LIST_CLASS,
  MAINTENANCE_HISTORY_MESSAGE_CLASS,
} from "./styles/MaintenanceHistory.styles";
import type { JSX } from "react";

const MaintenanceHistoryView = ({
  entries,
  errorMessage,
  hasNextPage,
  page,
}: MaintenanceHistoryViewProps): JSX.Element => (
  <main className={MAINTENANCE_HISTORY_CLASS}>
    <Title
      id={MAINTENANCE_HISTORY_HEADING_ID}
      variant={TitleVariant.PRIMARY}
      text={MAINTENANCE_HISTORY_COPY.HEADING}
      className={MAINTENANCE_HISTORY_HEADING_CLASS}
    />
    {errorMessage && (
      <Text
        className={MAINTENANCE_HISTORY_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    )}
    {!errorMessage && entries.length === 0 && (
      <Text className={MAINTENANCE_HISTORY_MESSAGE_CLASS}>
        {MAINTENANCE_HISTORY_COPY.EMPTY}
      </Text>
    )}
    {!errorMessage && entries.length > 0 && (
      <UnorderedList
        className={MAINTENANCE_HISTORY_LIST_CLASS}
        items={entries.map((entry) => ({
          id: entry.id,
          text: <MaintenanceHistoryCard entry={entry} />,
        }))}
      />
    )}
    {!errorMessage && (
      <MaintenanceHistoryPagination
        hasNextPage={hasNextPage}
        page={page}
      />
    )}
  </main>
);

export default MaintenanceHistoryView;
