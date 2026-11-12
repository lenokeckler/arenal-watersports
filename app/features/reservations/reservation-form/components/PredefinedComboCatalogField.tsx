import Text from "@/app/components/text/Text";
import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import type { PredefinedComboCatalogFieldProps } from "../models/PredefinedComboCatalogFieldProps.interface";
import { PREDEFINED_COMBO_EMPTY_CLASS } from "../styles/PredefinedComboSelection.styles";
import PredefinedComboCatalogSelect from "./PredefinedComboCatalogSelect";

const PredefinedComboCatalogField = (
  props: PredefinedComboCatalogFieldProps
): React.JSX.Element =>
  props.combos.length === 0 ? (
    <Text className={PREDEFINED_COMBO_EMPTY_CLASS}>
      {PREDEFINED_COMBO_FORM_COPY.EMPTY_CATALOG}
    </Text>
  ) : (
    <PredefinedComboCatalogSelect {...props} />
  );

export default PredefinedComboCatalogField;
