import type { Metadata } from "next";
import { WORKER_AREAS_METADATA } from "@/app/features/administration/worker-areas/constants/WorkerAreasMetadata.constants";
import WorkerAreas from "@/app/features/administration/worker-areas/WorkerAreas";

export const metadata: Metadata = WORKER_AREAS_METADATA;

const WorkerAreasPage = async ({
  searchParams,
}: PageProps<"/administration/workers/areas">): Promise<React.JSX.Element> => (
  <WorkerAreas query={await searchParams} />
);

export default WorkerAreasPage;
