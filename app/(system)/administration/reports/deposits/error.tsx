"use client";

import DepositsError from "@/app/features/administration/deposits-report/components/DepositsError";
import type { DepositsErrorProps } from "@/app/features/administration/deposits-report/models/DepositsErrorProps.interface";

const DepositsRouteError = ({
  reset,
}: DepositsErrorProps): React.JSX.Element => (
  <DepositsError reset={reset} />
);

export default DepositsRouteError;
