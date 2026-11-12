import type { CustomComboUnitAvailabilitySelectorProps } from "../models/CustomComboUnitAvailabilitySelectorProps.interface";
import { useCustomComboUnitAvailabilitySelectorViewModel } from "../hooks/useCustomComboUnitAvailabilitySelectorViewModel";
import CustomComboUnitSelector from "./CustomComboUnitSelector";

const CustomComboUnitAvailabilitySelector = (
  props: CustomComboUnitAvailabilitySelectorProps
): React.JSX.Element => {
  const viewModel =
    useCustomComboUnitAvailabilitySelectorViewModel(props);
  return <CustomComboUnitSelector {...viewModel} />;
};

export default CustomComboUnitAvailabilitySelector;
