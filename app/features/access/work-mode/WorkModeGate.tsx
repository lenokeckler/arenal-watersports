import { ensureWorkModeChosen } from "@/app/services/work-mode/ensureWorkModeChosen";

const WorkModeGate = async (): Promise<null> => {
  await ensureWorkModeChosen();

  return null;
};

export default WorkModeGate;
