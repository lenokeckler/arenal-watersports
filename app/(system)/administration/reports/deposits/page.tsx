import type { Metadata } from "next";
import { DEPOSITS_REPORT_METADATA } from "@/app/features/administration/deposits-report/constants/DepositsReportMetadata.constants";
import Deposits from "@/app/features/administration/deposits-report/Deposits";

export const metadata: Metadata = DEPOSITS_REPORT_METADATA;

const DepositsPage = (): React.JSX.Element => <Deposits />;

export default DepositsPage;
