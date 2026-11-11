import Spinner from "@/app/components/spinner/Spinner";
import { SPINNER_SIZE } from "@/app/constants";

const ExtraEditLoading = (): React.JSX.Element => (
  <Spinner size={SPINNER_SIZE.LARGE} />
);

export default ExtraEditLoading;
