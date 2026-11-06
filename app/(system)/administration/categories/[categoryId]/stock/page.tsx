import type { Metadata } from "next";
import { STOCK_COUNT_METADATA } from "@/app/features/administration/stock-catalog/constants/StockCountMetadata.constants";
import StockCount from "@/app/features/administration/stock-catalog/StockCount";

export const metadata: Metadata = STOCK_COUNT_METADATA;

const StockPage = async ({
  params,
  searchParams,
}: PageProps<"/administration/categories/[categoryId]/stock">): Promise<React.JSX.Element> => {
  const { categoryId } = await params;
  const { page } = await searchParams;

  return (
    <StockCount
      categoryId={categoryId}
      pageParam={page}
    />
  );
};

export default StockPage;
