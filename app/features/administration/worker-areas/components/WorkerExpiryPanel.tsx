import { Text } from "@/app/components";
import { WORKER_ACCOUNT_STATE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { WORKER_EXPIRY_COPY } from "../constants/WorkerExpiryCopy.constants";
import { WORKER_EXPIRY_STATUS } from "../constants/WorkerExpiry.constants";
import type { WorkerAreasPanelProps } from "../models/WorkerAreasPanelProps.interface";
import {
  WORKER_AREA_STATUS_CLASS,
  WORKER_AREAS_PANEL_CLASS,
  WORKER_AREAS_TITLE_CLASS,
} from "../styles/WorkerAreas.styles";
import { formatWorkerExpiryDate } from "../utils/formatWorkerExpiryDate";
import { resolveWorkerExpiryStatus } from "../utils/resolveWorkerExpiryStatus";
import WorkerExpiryForm from "./WorkerExpiryForm";

const WorkerExpiryPanel = ({
  overview,
}: WorkerAreasPanelProps): NullableRef<React.JSX.Element> => {
  if (
    !overview.isExternalGuide ||
    overview.expiresAt === null ||
    overview.accountState === WORKER_ACCOUNT_STATE.RETIRED
  ) {
    return null;
  }

  const status = resolveWorkerExpiryStatus(
    overview.expiresAt,
    new Date()
  );
  const date = formatWorkerExpiryDate(overview.expiresAt);
  const isExpired = status === WORKER_EXPIRY_STATUS.EXPIRED;
  const canExtend =
    isExpired || status === WORKER_EXPIRY_STATUS.EXPIRING;

  return (
    <section className={WORKER_AREAS_PANEL_CLASS}>
      <Text className={WORKER_AREAS_TITLE_CLASS}>
        {WORKER_EXPIRY_COPY.TITLE}
      </Text>
      <Text className={WORKER_AREA_STATUS_CLASS}>
        {isExpired
          ? WORKER_EXPIRY_COPY.EXPIRED_ON(date)
          : WORKER_EXPIRY_COPY.EXPIRES_ON(date)}
      </Text>
      {canExtend && (
        <WorkerExpiryForm
          username={overview.username}
          workerId={overview.id}
        />
      )}
    </section>
  );
};

export default WorkerExpiryPanel;
