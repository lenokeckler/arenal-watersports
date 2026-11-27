import Spinner from "@/app/components/spinner/Spinner";
import { SPINNER_SIZE } from "@/app/constants";

const ExtraCompatibilityUnitsLoading =
  (): React.JSX.Element => (
    <Spinner size={SPINNER_SIZE.LARGE} />
  );

export default ExtraCompatibilityUnitsLoading;
