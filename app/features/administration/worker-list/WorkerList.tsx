import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { readWorkerListPage } from "@/app/services/worker-list/readWorkerListPage";
import { resolveWorkerListSearch } from "@/app/services/worker-list/utils/resolveWorkerListSearch";
import { buildWorkerListDisplayRows } from "./utils/buildWorkerListDisplayRows";
import type { WorkerListProps } from "./models/WorkerListProps.interface";
import WorkerListView from "./WorkerListView";

const WorkerList = async ({
  searchParameters,
}: WorkerListProps): Promise<React.JSX.Element> => {
  const search = resolveWorkerListSearch(searchParameters);
  const page = await readWorkerListPage(search);

  if (!page) {
    redirect(PATHS.HOME);
  }

  return (
    <WorkerListView
      page={page}
      rows={buildWorkerListDisplayRows(page.items)}
      search={search}
    />
  );
};

export default WorkerList;
