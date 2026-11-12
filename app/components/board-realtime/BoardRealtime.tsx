"use client";

import type { NullableRef } from "@/app/types";
import BoardConnectionNotice from "./components/BoardConnectionNotice";
import { useBoardRealtimeViewModel } from "./hooks/useBoardRealtimeViewModel";
import type { BoardRealtimeProps } from "./models/BoardRealtimeProps.interface";

const BoardRealtime = ({
  channelName,
}: BoardRealtimeProps): NullableRef<React.JSX.Element> => {
  const { hasConnectionError } =
    useBoardRealtimeViewModel(channelName);

  return hasConnectionError ? (
    <BoardConnectionNotice />
  ) : null;
};

export default BoardRealtime;
