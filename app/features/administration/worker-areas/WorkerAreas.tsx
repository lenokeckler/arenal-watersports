import { redirect } from "next/navigation";
import BackLink from "@/app/components/back-link/BackLink";
import { PATHS } from "@/app/constants";
import { readWorkerAreasOverviewAsSignedIn } from "@/app/services/worker-areas";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import WorkerAccountNotice from "./components/WorkerAccountNotice";
import WorkerAreaNotice from "./components/WorkerAreaNotice";
import WorkerAreasHeading from "./components/WorkerAreasHeading";
import WorkerAreasResult from "./components/WorkerAreasResult";
import WorkerMarkNotice from "./components/WorkerMarkNotice";
import WorkerLookupForm from "./components/WorkerLookupForm";
import { WORKER_AREAS_COPY } from "./constants/WorkerAreasCopy.constants";
import type { WorkerAreasProps } from "./models/WorkerAreasProps.interface";
import { WORKER_AREAS_STACK_CLASS } from "./styles/WorkerAreas.styles";
import { readWorkerAreasSearch } from "./utils/readWorkerAreasSearch";

const WorkerAreas = async ({
  query,
}: WorkerAreasProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const search = readWorkerAreasSearch(query);
  const overview = search.username
    ? await readWorkerAreasOverviewAsSignedIn(
        search.username
      )
    : null;

  return (
    <div className={WORKER_AREAS_STACK_CLASS}>
      <WorkerAreasHeading />
      <WorkerAccountNotice search={search} />
      <WorkerAreaNotice search={search} />
      <WorkerMarkNotice search={search} />
      <WorkerLookupForm
        key={search.username}
        username={search.username}
      />
      <WorkerAreasResult
        overview={overview}
        username={search.username}
      />
      <BackLink
        href={PATHS.HOME}
        label={WORKER_AREAS_COPY.BACK}
      />
    </div>
  );
};

export default WorkerAreas;
