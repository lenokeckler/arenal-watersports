import { Text } from "@/app/components";
import {
  SUPABASE_WORK_AREA,
  WORKER_ACCOUNT_STATE,
} from "@/app/constants";
import { WORKER_ACCOUNT_ACTIONS_BY_STATE } from "../constants/WorkerAccountActions.constants";
import {
  WORKER_ACCOUNT_COPY,
  WORKER_ACCOUNT_STATE_LABEL,
} from "../constants/WorkerAccountCopy.constants";
import type { WorkerAreasPanelProps } from "../models/WorkerAreasPanelProps.interface";
import {
  WORKER_ACCOUNT_ACTIONS_CLASS,
  WORKER_ACCOUNT_NAME_CLASS,
  WORKER_ACCOUNT_ROW_CLASS,
  WORKER_AREA_LABEL_CLASS,
  WORKER_AREA_STATUS_CLASS,
  WORKER_AREAS_PANEL_CLASS,
  WORKER_AREAS_TITLE_CLASS,
} from "../styles/WorkerAreas.styles";
import WorkerAccountActionForm from "./WorkerAccountActionForm";
import { submitWorkerRehire } from "../actions/submitWorkerRehire";
import { submitWorkerTemporaryPassword } from "../actions/submitWorkerTemporaryPassword";
import WorkerTemporaryPasswordForm from "./WorkerTemporaryPasswordForm";

const WorkerAccountPanel = ({
  overview,
}: WorkerAreasPanelProps): React.JSX.Element => {
  const isAdministrationAccount =
    overview.baseRole === SUPABASE_WORK_AREA.ADMINISTRATION;
  const canGetTemporaryPassword =
    !isAdministrationAccount &&
    overview.accountState !== WORKER_ACCOUNT_STATE.RETIRED;
  const actions = isAdministrationAccount
    ? []
    : WORKER_ACCOUNT_ACTIONS_BY_STATE[
        overview.accountState
      ];

  return (
    <section className={WORKER_AREAS_PANEL_CLASS}>
      <Text className={WORKER_AREAS_TITLE_CLASS}>
        {WORKER_ACCOUNT_COPY.TITLE}
      </Text>
      <div className={WORKER_ACCOUNT_ROW_CLASS}>
        <div className={WORKER_ACCOUNT_NAME_CLASS}>
          <Text className={WORKER_AREA_LABEL_CLASS}>
            {
              WORKER_ACCOUNT_STATE_LABEL[
                overview.accountState
              ]
            }
          </Text>
          {isAdministrationAccount && (
            <Text className={WORKER_AREA_STATUS_CLASS}>
              {WORKER_ACCOUNT_COPY.ADMIN_ACCOUNT_NOTE}
            </Text>
          )}
        </div>
        {actions.length > 0 && (
          <div className={WORKER_ACCOUNT_ACTIONS_CLASS}>
            {actions.map((action) => (
              <WorkerAccountActionForm
                key={action}
                action={action}
                username={overview.username}
                workerId={overview.id}
              />
            ))}
          </div>
        )}
      </div>
      {canGetTemporaryPassword &&
        overview.hasPersonalEmail && (
          <Text className={WORKER_AREA_STATUS_CLASS}>
            {WORKER_ACCOUNT_COPY.HAS_PERSONAL_EMAIL_NOTE}
          </Text>
        )}
      <WorkerTemporaryPasswordForm
        action={submitWorkerTemporaryPassword}
        doneMessage={
          WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD_DONE
        }
        isAvailable={
          canGetTemporaryPassword &&
          !overview.hasPersonalEmail
        }
        label={WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD}
        pendingLabel={
          WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD_PENDING
        }
        workerId={overview.id}
      />
      <WorkerTemporaryPasswordForm
        action={submitWorkerRehire}
        doneMessage={WORKER_ACCOUNT_COPY.REHIRE_DONE}
        isAvailable={
          !isAdministrationAccount &&
          overview.accountState ===
            WORKER_ACCOUNT_STATE.RETIRED
        }
        label={WORKER_ACCOUNT_COPY.REHIRE}
        pendingLabel={WORKER_ACCOUNT_COPY.REHIRE_PENDING}
        workerId={overview.id}
      />
    </section>
  );
};

export default WorkerAccountPanel;
