import type { Metadata } from "next";
import { WORKER_REGISTRATION_METADATA } from "@/app/features/administration/worker-registration/constants/WorkerRegistrationMetadata.constants";
import WorkerRegistration from "@/app/features/administration/worker-registration/WorkerRegistration";

export const metadata: Metadata =
  WORKER_REGISTRATION_METADATA;

const NewWorkerPage = (): React.JSX.Element => (
  <WorkerRegistration />
);

export default NewWorkerPage;
