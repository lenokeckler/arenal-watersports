import type { DISPATCH_GROUP_STATUS } from "../constants/DispatchSheet.constants";

export interface DispatchGroupResult {
  status: (typeof DISPATCH_GROUP_STATUS)[keyof typeof DISPATCH_GROUP_STATUS];
}
