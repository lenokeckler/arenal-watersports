import type { CLOSE_GROUP_STATUS } from "../constants/CloseGroup.constants";

export interface CloseGroupResult {
  status: (typeof CLOSE_GROUP_STATUS)[keyof typeof CLOSE_GROUP_STATUS];
}
