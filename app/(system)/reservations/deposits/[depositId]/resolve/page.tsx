import type { Metadata } from "next";
import DepositResolution from "@/app/features/reservations/deposit-resolution/DepositResolution";
import { DEPOSIT_RESOLUTION_UI_COPY } from "@/app/features/reservations/deposit-resolution/constants/DepositResolutionUiCopy.constants";

export const metadata: Metadata = {
  title: DEPOSIT_RESOLUTION_UI_COPY.TITLE,
};

const DepositResolutionPage = async ({
  params,
}: PageProps<"/reservations/deposits/[depositId]/resolve">): Promise<React.JSX.Element> => {
  const { depositId } = await params;

  return <DepositResolution depositId={depositId} />;
};

export default DepositResolutionPage;
