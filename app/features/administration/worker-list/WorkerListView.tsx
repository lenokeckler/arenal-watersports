import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  IMAGE_ALTS,
  STRING,
} from "@/app/constants";
import { WORKER_LIST_COPY } from "./constants/WorkerListCopy.constants";
import type { WorkerListViewProps } from "./models/WorkerListViewProps.interface";
import { WORKER_LIST_CONTENT_CLASS } from "./styles/WorkerList.styles";
import WorkerListPagination from "./WorkerListPagination";
import WorkerListFilters from "./components/WorkerListFilters";
import WorkerListRecords from "./components/WorkerListRecords";

const WorkerListView = ({
  page,
  rows,
  search,
}: WorkerListViewProps): React.JSX.Element => (
  <div className={WORKER_LIST_CONTENT_CLASS}>
    <ScreenHeading
      title={WORKER_LIST_COPY.TITLE}
      titleId={ADMINISTRATION_SCREEN_TITLE_ID}
      logoAlt={IMAGE_ALTS.COMPANY_LOGO}
      instruction={WORKER_LIST_COPY.INSTRUCTION}
    />
    <WorkerListFilters
      key={[
        search.baseRole ?? STRING.Empty,
        search.status ?? STRING.Empty,
      ].join(STRING.MIDDLE_DOT)}
      search={search}
    />
    <WorkerListRecords rows={rows} />
    <WorkerListPagination
      pageCount={page.pageCount}
      pageIndex={page.pageIndex}
      search={search}
    />
  </div>
);

export default WorkerListView;
