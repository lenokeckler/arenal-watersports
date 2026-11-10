import FormSuccessNotice from "@/app/components/form-success-notice/FormSuccessNotice";
import type { NullableRef } from "@/app/types";
import {
  WORKER_MARK_CHANGED_NOTICE,
  WORKER_MARK_LABEL,
} from "../constants/WorkerAreasCopy.constants";
import type { WorkerAreaNoticeProps } from "../models/WorkerAreaNoticeProps.interface";

const WorkerMarkNotice = ({
  search: { mark, markNotice },
}: WorkerAreaNoticeProps): NullableRef<React.JSX.Element> =>
  mark && markNotice ? (
    <FormSuccessNotice
      message={WORKER_MARK_CHANGED_NOTICE[markNotice](
        WORKER_MARK_LABEL[mark]
      )}
    />
  ) : null;

export default WorkerMarkNotice;
