import { redirect } from "next/navigation";
import { LENGTH, PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { EXTRA_LIST_DIAGNOSTICS } from "./constants/ExtraListDiagnostics.constants";
import ExtraListView from "./ExtraListView";
import type { ExtraListProps } from "./models/ExtraListProps.interface";
import type { ExtraListViewProps } from "./models/ExtraListViewProps.interface";
import { listExtras } from "./services/listExtras";

const fetchExtraListViewProps = async (
  currentPage: number
): Promise<ExtraListViewProps> => {
  try {
    const { extras, pageCount } =
      await listExtras(currentPage);
    return {
      currentPage,
      extras,
      fetchFailed: false,
      pageCount,
    };
  } catch (error) {
    const fetchError = new Error(
      EXTRA_LIST_DIAGNOSTICS.FETCH_FAILED,
      { cause: error }
    );
    return {
      currentPage,
      extras: [],
      fetchError,
      fetchFailed: true,
      pageCount: LENGTH.ZERO,
    };
  }
};

const ExtraList = async ({
  pageParam,
}: ExtraListProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const extraListViewProps = await fetchExtraListViewProps(
    resolveListPage(pageParam)
  );

  if (
    extraListViewProps.currentPage >
      extraListViewProps.pageCount &&
    extraListViewProps.pageCount > LENGTH.ZERO
  ) {
    redirect(
      resolveListPageHref(
        PATHS.ADMINISTRATION.EXTRAS,
        extraListViewProps.pageCount
      )
    );
  }

  return <ExtraListView {...extraListViewProps} />;
};

export default ExtraList;
