import type { Metadata } from "next";
import { INCOME_METADATA } from "@/app/features/administration/income/constants/IncomeMetadata.constants";
import Income from "@/app/features/administration/income/Income";

export const metadata: Metadata = INCOME_METADATA;

const IncomePage = (): React.JSX.Element => <Income />;

export default IncomePage;
