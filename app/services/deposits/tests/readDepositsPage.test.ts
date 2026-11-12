import { describe, expect, it, vi } from "vitest";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { readDepositsPage } from "../readDepositsPage";
import type { DepositRow } from "../models/DepositRow.interface";
import type { DepositsRangeResponse } from "../models/DepositsRangeResponse.interface";
import {
  CRC_DEPOSIT_ROW,
  FIRST_PAGE_RANGE,
  LAST_PAGE_RANGE,
  MULTI_PAGE_COUNT,
  MULTI_PAGE_TOTAL_COUNT,
  OUT_OF_RANGE_ERROR,
  OUT_OF_RANGE_PAGE,
  OUT_OF_RANGE_PAGE_RANGE,
  READ_FAILURE,
  SECOND_PAGE,
  SECOND_PAGE_RANGE,
  TEST_OPERATION,
  USD_DEPOSIT_ROW,
} from "./Deposits.constants";

const respond = (
  response: Partial<DepositsRangeResponse<DepositRow>>
): DepositsRangeResponse<DepositRow> => ({
  count: null,
  data: null,
  error: null,
  ...response,
});

describe("readDepositsPage", () => {
  it("reads only the range of the requested page", async () => {
    const readRange = vi.fn().mockResolvedValue(
      respond({
        count: MULTI_PAGE_TOTAL_COUNT,
        data: [USD_DEPOSIT_ROW],
      })
    );

    const depositsPage = await readDepositsPage(
      readRange,
      SECOND_PAGE,
      TEST_OPERATION
    );

    expect(readRange).toHaveBeenCalledOnce();
    expect(readRange).toHaveBeenCalledWith(
      SECOND_PAGE_RANGE
    );
    expect(depositsPage).toEqual({
      items: [USD_DEPOSIT_ROW],
      page: SECOND_PAGE,
      pageCount: MULTI_PAGE_COUNT,
      totalCount: MULTI_PAGE_TOTAL_COUNT,
    });
  });

  it("falls back to the last page when the requested page is past the end", async () => {
    const readRange = vi
      .fn()
      .mockResolvedValueOnce(
        respond({ error: OUT_OF_RANGE_ERROR })
      )
      .mockResolvedValueOnce(
        respond({
          count: MULTI_PAGE_TOTAL_COUNT,
          data: [USD_DEPOSIT_ROW],
        })
      )
      .mockResolvedValueOnce(
        respond({
          count: MULTI_PAGE_TOTAL_COUNT,
          data: [CRC_DEPOSIT_ROW],
        })
      );

    const depositsPage = await readDepositsPage(
      readRange,
      OUT_OF_RANGE_PAGE,
      TEST_OPERATION
    );

    expect(readRange.mock.calls).toEqual([
      [OUT_OF_RANGE_PAGE_RANGE],
      [FIRST_PAGE_RANGE],
      [LAST_PAGE_RANGE],
    ]);
    expect(depositsPage).toEqual({
      items: [CRC_DEPOSIT_ROW],
      page: MULTI_PAGE_COUNT,
      pageCount: MULTI_PAGE_COUNT,
      totalCount: MULTI_PAGE_TOTAL_COUNT,
    });
  });

  it("throws a SupabaseQueryError when the page read fails", async () => {
    const readRange = vi
      .fn()
      .mockResolvedValue(respond({ error: READ_FAILURE }));

    await expect(
      readDepositsPage(
        readRange,
        LIST_PAGINATION.FIRST_PAGE,
        TEST_OPERATION
      )
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });

  it("throws a SupabaseQueryError when the fallback read fails", async () => {
    const readRange = vi
      .fn()
      .mockResolvedValueOnce(
        respond({ error: OUT_OF_RANGE_ERROR })
      )
      .mockResolvedValueOnce(
        respond({ error: READ_FAILURE })
      );

    await expect(
      readDepositsPage(
        readRange,
        OUT_OF_RANGE_PAGE,
        TEST_OPERATION
      )
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
