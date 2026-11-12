import type { PredefinedComboCatalogOptionProps } from "../models/PredefinedComboCatalogOptionProps.interface";
import { getPredefinedComboOptionLabel } from "../utils/getPredefinedComboAudienceLabel";

const PredefinedComboCatalogOption = ({
  combo,
}: PredefinedComboCatalogOptionProps): React.JSX.Element => (
  <option value={combo.id}>
    {getPredefinedComboOptionLabel(combo)}
  </option>
);

export default PredefinedComboCatalogOption;
