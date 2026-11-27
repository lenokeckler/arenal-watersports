"use client";

import { AUTOCOMPLETE } from "@/app/constants";
import DepositResolutionForm from "./components/DepositResolutionForm";
import DepositResolutionLayout from "./components/DepositResolutionLayout";
import DepositResolutionSuccess from "./components/DepositResolutionSuccess";
import DepositResolutionSummary from "./components/DepositResolutionSummary";
import { useDepositResolutionErrorFocus } from "./hooks/useDepositResolutionFocus";
import { useDepositResolutionViewModel } from "./hooks/useDepositResolutionViewModel";
import type { DepositResolutionViewProps } from "./models/DepositResolutionViewProps.interface";
import { DEPOSIT_RESOLUTION_FORM_CLASS } from "./styles/DepositResolutionForm.styles";

const DepositResolutionView = ({
  deposit,
}: DepositResolutionViewProps): React.JSX.Element => {
  const viewModel = useDepositResolutionViewModel(deposit);
  useDepositResolutionErrorFocus(
    viewModel.errors,
    viewModel.formError
  );

  return (
    <DepositResolutionLayout>
      {viewModel.recorded ? (
        <DepositResolutionSuccess
          code={deposit.code}
          recorded={viewModel.recorded}
        />
      ) : (
        <form
          noValidate
          autoComplete={AUTOCOMPLETE.OFF}
          aria-busy={viewModel.isPending}
          className={DEPOSIT_RESOLUTION_FORM_CLASS}
          onSubmit={viewModel.handleSubmit}
        >
          <DepositResolutionSummary deposit={deposit} />
          <DepositResolutionForm
            deposit={deposit}
            viewModel={viewModel}
          />
        </form>
      )}
    </DepositResolutionLayout>
  );
};

export default DepositResolutionView;
