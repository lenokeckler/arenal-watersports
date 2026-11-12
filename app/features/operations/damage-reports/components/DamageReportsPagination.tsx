import Link from "@/app/components/link/Link";
import { DAMAGE_REPORTS_PAGINATION } from "../constants/DamageReports.constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageReportsPaginationProps } from "../models/DamageReportsPaginationProps.interface";
import {
  DAMAGE_REPORTS_PAGINATION_CLASS,
  DAMAGE_REPORTS_PAGINATION_LINK_CLASS,
  DAMAGE_REPORTS_PAGINATION_NEXT_CLASS,
} from "../styles/DamageReports.styles";
import { getDamageReportsHref } from "../utils/getDamageReportsHref";
import type { JSX } from "react";

const DamageReportsPagination = ({
  hasNextPage,
  page,
  unitId,
}: DamageReportsPaginationProps): JSX.Element => (
  <nav
    aria-label={DAMAGE_REPORTS_COPY.PAGE_LABEL}
    className={DAMAGE_REPORTS_PAGINATION_CLASS}
  >
    {page > DAMAGE_REPORTS_PAGINATION.FIRST_PAGE && (
      <Link
        className={DAMAGE_REPORTS_PAGINATION_LINK_CLASS}
        href={getDamageReportsHref(unitId, page - 1)}
      >
        {DAMAGE_REPORTS_COPY.PREVIOUS_PAGE}
      </Link>
    )}
    {hasNextPage && (
      <Link
        className={DAMAGE_REPORTS_PAGINATION_NEXT_CLASS}
        href={getDamageReportsHref(unitId, page + 1)}
      >
        {DAMAGE_REPORTS_COPY.NEXT_PAGE}
      </Link>
    )}
  </nav>
);

export default DamageReportsPagination;
