import type { ListPageRange } from "@/app/utils/list-pagination/models/ListPageRange.interface";
import type { DepositsRangeResponse } from "./DepositsRangeResponse.interface";

export type DepositsRangeReader<Row> = (
  range: ListPageRange
) => PromiseLike<DepositsRangeResponse<Row>>;
