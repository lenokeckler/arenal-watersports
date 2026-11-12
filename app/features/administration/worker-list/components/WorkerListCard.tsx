import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import SectionTitle from "@/app/components/section-title/SectionTitle";
import { WORKER_LIST_COPY } from "../constants/WorkerListCopy.constants";
import type { WorkerListCardFieldProps } from "../models/WorkerListCardFieldProps.interface";
import type { WorkerListCardProps } from "../models/WorkerListCardProps.interface";
import {
  WORKER_LIST_CARD_CLASS,
  WORKER_LIST_CARD_FIELD_CLASS,
  WORKER_LIST_CARD_IDENTITY_CLASS,
  WORKER_LIST_CARD_LABEL_CLASS,
  WORKER_LIST_CARD_NAME_CLASS,
  WORKER_LIST_CARD_USERNAME_CLASS,
  WORKER_LIST_CARD_VALUE_CLASS,
} from "../styles/WorkerList.styles";

const WorkerListCardField = ({
  label,
  value,
}: WorkerListCardFieldProps): React.JSX.Element => (
  <div className={WORKER_LIST_CARD_FIELD_CLASS}>
    <InlineText className={WORKER_LIST_CARD_LABEL_CLASS}>
      {label}
    </InlineText>
    <Text className={WORKER_LIST_CARD_VALUE_CLASS}>
      {value}
    </Text>
  </div>
);

const WorkerListCard = ({
  row,
}: WorkerListCardProps): React.JSX.Element => (
  <article
    aria-label={row.fullName}
    className={WORKER_LIST_CARD_CLASS}
  >
    <div className={WORKER_LIST_CARD_IDENTITY_CLASS}>
      <SectionTitle
        className={WORKER_LIST_CARD_NAME_CLASS}
        text={row.fullName}
      />
      <Text className={WORKER_LIST_CARD_USERNAME_CLASS}>
        {row.username}
      </Text>
    </div>
    <WorkerListCardField
      label={WORKER_LIST_COPY.COLUMNS.BASE_ROLE}
      value={row.baseRole}
    />
    <WorkerListCardField
      label={WORKER_LIST_COPY.COLUMNS.ADDITIONAL_AREAS}
      value={row.additionalAreas}
    />
    <WorkerListCardField
      label={WORKER_LIST_COPY.COLUMNS.MARKS}
      value={row.marks}
    />
    <WorkerListCardField
      label={WORKER_LIST_COPY.COLUMNS.EXPIRY_DATE}
      value={row.expiresAt}
    />
    <WorkerListCardField
      label={WORKER_LIST_COPY.COLUMNS.STATUS}
      value={row.status}
    />
  </article>
);

export default WorkerListCard;
