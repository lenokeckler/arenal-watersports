import { ensureWorkModeChosen } from "./ensureWorkModeChosen";

const WorkModeGate = async (): Promise<null> => {
  await ensureWorkModeChosen();

  return null;
};

export default WorkModeGate;
