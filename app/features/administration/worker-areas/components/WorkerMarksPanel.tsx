import { Text } from "@/app/components";
import {
  GRANTABLE_WORKER_MARKS,
  WORKER_MARK_FIELD,
} from "@/app/constants";
import { submitWorkerMarkChange } from "../actions/submitWorkerMarkChange";
import {
  WORKER_AREAS_COPY,
  WORKER_MARK_CHANGE_ERROR,
  WORKER_MARK_CHANGE_LABELS,
  WORKER_MARK_DESCRIPTION,
  WORKER_MARK_LABEL,
} from "../constants/WorkerAreasCopy.constants";
import type { WorkerAreasPanelProps } from "../models/WorkerAreasPanelProps.interface";
import {
  WORKER_AREA_LABEL_CLASS,
  WORKER_AREA_NAME_CLASS,
  WORKER_AREA_ROW_CLASS,
  WORKER_AREA_STATUS_CLASS,
  WORKER_AREAS_PANEL_CLASS,
  WORKER_AREAS_TITLE_CLASS,
} from "../styles/WorkerAreas.styles";
import { resolveWorkerMarkStatus } from "../utils/resolveWorkerMarkStatus";
import WorkerAccessChangeForm from "./WorkerAccessChangeForm";

const WorkerMarksPanel = ({
  overview,
}: WorkerAreasPanelProps): React.JSX.Element => (
  <section className={WORKER_AREAS_PANEL_CLASS}>
    <Text className={WORKER_AREAS_TITLE_CLASS}>
      {WORKER_AREAS_COPY.MARKS_TITLE}
    </Text>
    {GRANTABLE_WORKER_MARKS.map((mark) => {
      const status = resolveWorkerMarkStatus(
        overview,
        mark
      );

      return (
        <div
          key={mark}
          className={WORKER_AREA_ROW_CLASS}
        >
          <div className={WORKER_AREA_NAME_CLASS}>
            <Text className={WORKER_AREA_LABEL_CLASS}>
              {WORKER_MARK_LABEL[mark]}
            </Text>
            <Text className={WORKER_AREA_STATUS_CLASS}>
              {status.label}
            </Text>
            <Text className={WORKER_AREA_STATUS_CLASS}>
              {WORKER_MARK_DESCRIPTION[mark]}
            </Text>
          </div>
          <WorkerAccessChangeForm
            action={submitWorkerMarkChange}
            errorCopy={WORKER_MARK_CHANGE_ERROR}
            intent={status.intent}
            labels={WORKER_MARK_CHANGE_LABELS}
            targetName={WORKER_MARK_FIELD.MARK}
            targetValue={mark}
            username={overview.username}
            workerId={overview.id}
          />
        </div>
      );
    })}
  </section>
);

export default WorkerMarksPanel;
