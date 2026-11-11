import type { Metadata } from "next";
import { DEPOSITS_REPORT_METADATA } from "@/app/features/administration/deposits-report/constants/DepositsReportMetadata.constants";
import Deposits from "@/app/features/administration/deposits-report/Deposits";

export const metadata: Metadata = DEPOSITS_REPORT_METADATA;

const DepositsPage = async ({
  searchParams,
}: PageProps<"/administration/reports/deposits">): Promise<React.JSX.Element> => {
  const { pendingPage, retainedPage } = await searchParams;

  return (
    <Deposits
      pendingPageParam={pendingPage}
      retainedPageParam={retainedPage}
    />
  );
};

export default DepositsPage;
