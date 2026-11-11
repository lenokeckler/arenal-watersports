import FormSuccessNotice from "@/app/components/form-success-notice/FormSuccessNotice";
import type { NullableRef } from "@/app/types";
import { WORKER_ACCOUNT_NOTICE } from "../constants/WorkerAccountCopy.constants";
import type { WorkerAreaNoticeProps } from "../models/WorkerAreaNoticeProps.interface";

const WorkerAccountNotice = ({
  search: { accountNotice },
}: WorkerAreaNoticeProps): NullableRef<React.JSX.Element> =>
  accountNotice ? (
    <FormSuccessNotice
      message={WORKER_ACCOUNT_NOTICE[accountNotice]}
    />
  ) : null;

export default WorkerAccountNotice;
