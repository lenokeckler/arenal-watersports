import AlertStrip from "@/app/components/alert-strip/AlertStrip";
import type { NullableRef } from "@/app/types";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageSectionProps } from "../models/DamageSectionProps.interface";
import { buildDamageReportsHref } from "../utils/buildDamageReportsHref";
import DamagePendingSheet from "./DamagePendingSheet";
import DamageSinglePending from "./DamageSinglePending";
import type { JSX } from "react";

const DamagePendingStrip = ({
  filters,
  overview,
}: DamageSectionProps): NullableRef<JSX.Element> => {
  const [first] = overview.pending;

  if (!first) {
    return null;
  }

  const total = overview.pending.length;
  const title = DAMAGE_REPORTS_COPY.PENDING_TITLE(total);

  if (total === 1) {
    return <DamageSinglePending report={first} />;
  }

  return (
    <>
      <AlertStrip
        actionLabel={DAMAGE_REPORTS_COPY.PENDING_OPEN}
        detail={DAMAGE_REPORTS_COPY.PENDING_MANY_DETAIL}
        href={buildDamageReportsHref(filters, {
          showPending: true,
        })}
        replace
        title={title}
      />
      {filters.showPending && (
        <DamagePendingSheet
          closeHref={buildDamageReportsHref(filters)}
          reports={overview.pending}
          title={title}
        />
      )}
    </>
  );
};

export default DamagePendingStrip;
