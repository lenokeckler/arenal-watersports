import { UUID_PATTERN } from "@/app/constants";
import {
  CATEGORY_UNIT_LIMITS,
  CATEGORY_UNIT_UPDATE_ERROR,
} from "../constants/CategoryUnits.constants";
import type { OpenDispatchUpdateInput } from "../models/OpenDispatchUpdateInput.interface";

const isValidRadioChannel = (
  channel: OpenDispatchUpdateInput["radioChannel"]
): boolean =>
  channel === null ||
  (Number.isInteger(channel) &&
    channel >= CATEGORY_UNIT_LIMITS.RADIO_CHANNEL_MIN &&
    channel <= CATEGORY_UNIT_LIMITS.RADIO_CHANNEL_MAX);

export const validateOpenDispatchUpdateInput = ({
  departureAt,
  dispatchId,
  radioChannel,
  returnsAt,
}: OpenDispatchUpdateInput): void => {
  const departureMs = Date.parse(departureAt);
  const returnsMs = Date.parse(returnsAt);
  const isValid =
    UUID_PATTERN.test(dispatchId) &&
    Number.isFinite(departureMs) &&
    Number.isFinite(returnsMs) &&
    returnsMs > departureMs &&
    isValidRadioChannel(radioChannel);

  if (!isValid) {
    throw new RangeError(
      CATEGORY_UNIT_UPDATE_ERROR.INVALID_INPUT
    );
  }
};
