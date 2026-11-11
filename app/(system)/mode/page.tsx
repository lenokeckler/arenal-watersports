import type { Metadata } from "next";
import { WORK_MODE_METADATA } from "@/app/features/access/work-mode/constants/WorkModeMetadata.constants";
import WorkModeSelector from "@/app/features/access/work-mode/WorkModeSelector";

export const metadata: Metadata = WORK_MODE_METADATA;

const WorkModePage = (): Promise<React.JSX.Element> =>
  WorkModeSelector();

export default WorkModePage;
