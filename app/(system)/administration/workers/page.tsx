import type { Metadata } from "next";
import { WORKER_LIST_METADATA } from "@/app/features/administration/worker-list/constants/WorkerListMetadata.constants";
import WorkerList from "@/app/features/administration/worker-list/WorkerList";

export const metadata: Metadata = WORKER_LIST_METADATA;

const WorkerListPage = async ({
  searchParams,
}: PageProps<"/administration/workers">): Promise<React.JSX.Element> => (
  <WorkerList searchParameters={await searchParams} />
);

export default WorkerListPage;
