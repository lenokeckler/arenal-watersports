import FormSuccessNotice from "@/app/components/form-success-notice/FormSuccessNotice";
import { WORK_AREA_LABEL } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { WORKER_AREA_CHANGED_NOTICE } from "../constants/WorkerAreasCopy.constants";
import type { WorkerAreaNoticeProps } from "../models/WorkerAreaNoticeProps.interface";

const WorkerAreaNotice = ({
  search: { area, notice },
}: WorkerAreaNoticeProps): NullableRef<React.JSX.Element> =>
  area && notice ? (
    <FormSuccessNotice
      message={WORKER_AREA_CHANGED_NOTICE[notice](
        WORK_AREA_LABEL[area]
      )}
    />
  ) : null;

export default WorkerAreaNotice;
