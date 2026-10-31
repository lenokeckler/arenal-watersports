import type { DepositsReportFixture } from "./DepositsReportFixture.interface";

export interface DepositsReportHandle {
  fixture: DepositsReportFixture;
  remove: () => Promise<void>;
}
