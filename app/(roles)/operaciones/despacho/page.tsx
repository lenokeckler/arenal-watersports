import type { Metadata } from "next";
import DispatchBoard from "@/app/components/dispatch-board/DispatchBoard";
import { DISPATCH_BOARD_COPY } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import type { DispatchBoardRouteProps } from "@/app/components/dispatch-board/models/DispatchBoardRouteProps.interface";
import { DISPATCH_BOARD_PAGINATION } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import { getDispatchPage } from "@/app/components/dispatch-board/utils/getDispatchPage";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: DISPATCH_BOARD_COPY.HEADING,
};

const PendingDispatchesPage = async ({
  searchParams,
}: DispatchBoardRouteProps): Promise<JSX.Element> => {
  const params = await searchParams;
  const page = getDispatchPage(
    params[DISPATCH_BOARD_PAGINATION.QUERY_KEY]
  );

  return <DispatchBoard page={page} />;
};

export default PendingDispatchesPage;
