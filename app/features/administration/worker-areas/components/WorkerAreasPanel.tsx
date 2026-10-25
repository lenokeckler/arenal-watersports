import { Text } from "@/app/components";
import {
  GRANTABLE_WORKER_AREAS,
  WORK_AREA_LABEL,
} from "@/app/constants";
import { submitWorkerAreaChange } from "../actions/submitWorkerAreaChange";
import { WORKER_AREAS_COPY } from "../constants/WorkerAreasCopy.constants";
import type { WorkerAreasPanelProps } from "../models/WorkerAreasPanelProps.interface";
import {
  WORKER_AREA_LABEL_CLASS,
  WORKER_AREA_NAME_CLASS,
  WORKER_AREA_ROW_CLASS,
  WORKER_AREA_STATUS_CLASS,
  WORKER_AREAS_PANEL_CLASS,
  WORKER_AREAS_SUMMARY_CLASS,
  WORKER_AREAS_TITLE_CLASS,
} from "../styles/WorkerAreas.styles";
import { resolveWorkerAreaStatus } from "../utils/resolveWorkerAreaStatus";
import WorkerAreaChangeForm from "./WorkerAreaChangeForm";

const WorkerAreasPanel = ({
  overview,
}: WorkerAreasPanelProps): React.JSX.Element => (
  <section className={WORKER_AREAS_PANEL_CLASS}>
    <Text className={WORKER_AREAS_SUMMARY_CLASS}>
      {WORKER_AREAS_COPY.WORKER_SUMMARY(
        overview.fullName,
        overview.username
      )}
    </Text>
    <Text className={WORKER_AREAS_TITLE_CLASS}>
      {WORKER_AREAS_COPY.AREAS_TITLE}
    </Text>
    {GRANTABLE_WORKER_AREAS.map((area) => {
      const status = resolveWorkerAreaStatus(
        overview,
        area
      );

      return (
        <div
          key={area}
          className={WORKER_AREA_ROW_CLASS}
        >
          <div className={WORKER_AREA_NAME_CLASS}>
            <Text className={WORKER_AREA_LABEL_CLASS}>
              {WORK_AREA_LABEL[area]}
            </Text>
            <Text className={WORKER_AREA_STATUS_CLASS}>
              {status.label}
            </Text>
          </div>
          {status.intent && (
            <WorkerAreaChangeForm
              action={submitWorkerAreaChange}
              area={area}
              intent={status.intent}
              username={overview.username}
              workerId={overview.id}
            />
          )}
        </div>
      );
    })}
  </section>
);

export default WorkerAreasPanel;
