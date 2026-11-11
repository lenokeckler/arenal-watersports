import { MaterialIcon } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { INCOME_COPY } from "../constants/IncomeCopy.constants";
import {
  INCOME_NET_NOTE_CLASS,
  INCOME_NET_NOTE_ICON_CLASS,
} from "../styles/IncomeCurrency.styles";

const IncomeNetNote = (): React.JSX.Element => (
  <dd className={INCOME_NET_NOTE_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.TRENDING_DOWN}
      className={INCOME_NET_NOTE_ICON_CLASS}
    />
    {INCOME_COPY.NET_NEGATIVE_NOTE}
  </dd>
);

export default IncomeNetNote;
