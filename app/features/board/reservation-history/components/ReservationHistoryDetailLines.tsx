import { Text } from "@/app/components";
import { LENGTH } from "@/app/constants";
import type { ReservationHistoryDetailLinesProps } from "../models/ReservationHistoryDetailLinesProps.interface";

const ReservationHistoryDetailLines = ({
  fallback,
  names,
}: ReservationHistoryDetailLinesProps): React.JSX.Element => (
  <>
    {names.length === LENGTH.ZERO ? (
      <Text>{fallback}</Text>
    ) : (
      names.map((name, index) => (
        <Text key={`${name}${index}`}>{name}</Text>
      ))
    )}
  </>
);

export default ReservationHistoryDetailLines;
