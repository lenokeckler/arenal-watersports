import { Text } from "@/app/components";
import {
  ARIA_ROLE,
  WORKER_ACCOUNT_STATE,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { WORKER_AREAS_COPY } from "../constants/WorkerAreasCopy.constants";
import type { WorkerAreasResultProps } from "../models/WorkerAreasResultProps.interface";
import { WORKER_AREAS_MESSAGE_CLASS } from "../styles/WorkerAreas.styles";
import WorkerAccountPanel from "./WorkerAccountPanel";
import WorkerAreasPanel from "./WorkerAreasPanel";
import WorkerMarksPanel from "./WorkerMarksPanel";

const WorkerAreasResult = ({
  overview,
  username,
}: WorkerAreasResultProps): NullableRef<React.JSX.Element> => {
  if (!username) {
    return null;
  }

  if (!overview) {
    return (
      <Text
        role={ARIA_ROLE.STATUS}
        className={WORKER_AREAS_MESSAGE_CLASS}
      >
        {WORKER_AREAS_COPY.NOT_FOUND}
      </Text>
    );
  }

  if (overview.isExternalGuide) {
    return (
      <Text
        role={ARIA_ROLE.STATUS}
        className={WORKER_AREAS_MESSAGE_CLASS}
      >
        {WORKER_AREAS_COPY.EXTERNAL_GUIDE}
      </Text>
    );
  }

  const isRetired =
    overview.accountState === WORKER_ACCOUNT_STATE.RETIRED;

  return (
    <>
      <WorkerAccountPanel overview={overview} />
      {!isRetired && (
        <WorkerAreasPanel overview={overview} />
      )}
      {!isRetired && (
        <WorkerMarksPanel overview={overview} />
      )}
    </>
  );
};

export default WorkerAreasResult;
