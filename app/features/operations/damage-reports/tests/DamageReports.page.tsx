import { render, screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import DamageReportsView from "../DamageReportsView";
import type { DamageReportsViewProps } from "../models/DamageReportsViewProps.interface";
import {
  DAMAGE_FILTERS,
  DAMAGE_OVERVIEW,
} from "./DamageReports.constants";

export const createDamageReportsPage = (
  props: Partial<DamageReportsViewProps> = {}
) => {
  render(
    <DamageReportsView
      errorMessage={null}
      filters={DAMAGE_FILTERS}
      overview={DAMAGE_OVERVIEW}
      savedMessage={null}
      {...props}
    />
  );

  return {
    getLink: (name: string | RegExp) =>
      screen.getByRole(ARIA_ROLE.LINK, { name }),
    queryLink: (name: string | RegExp) =>
      screen.queryByRole(ARIA_ROLE.LINK, { name }),
    queryLinks: (name: string | RegExp) =>
      screen.queryAllByRole(ARIA_ROLE.LINK, { name }),
    queryDialog: () => screen.queryByRole("dialog"),
    queryText: (text: string) => screen.queryByText(text),
    getText: (text: string) => screen.getByText(text),
    getAlert: () => screen.getByRole(ARIA_ROLE.ALERT),
    getStatus: () => screen.getByRole(ARIA_ROLE.STATUS),
  };
};
