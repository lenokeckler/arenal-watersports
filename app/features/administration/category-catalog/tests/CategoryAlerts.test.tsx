import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import CategoryAlerts from "../CategoryAlerts";
import CategoryAlertsForm from "../CategoryAlertsForm";
import { getCategoryAlerts } from "../services/getCategoryAlerts";
import {
  CATEGORY_ALERT_ID,
  DEFAULT_CATEGORY_ALERTS,
} from "./CategoryAlerts.constants";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/getCategoryAlerts", () => ({
  getCategoryAlerts: vi.fn(),
}));

const renderEntry = () =>
  CategoryAlerts({ categoryId: CATEGORY_ALERT_ID });

describe("CategoryAlerts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
  });

  it("sends anyone who is not administration to the home without reading the category", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(renderEntry()).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
    expect(getCategoryAlerts).not.toHaveBeenCalled();
  });

  it("shows not found when the category does not exist", async () => {
    vi.mocked(getCategoryAlerts).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow();
    expect(notFound).toHaveBeenCalledOnce();
  });

  it("gives administration the alerts form of the category", async () => {
    vi.mocked(getCategoryAlerts).mockResolvedValue(
      DEFAULT_CATEGORY_ALERTS
    );

    const element = await renderEntry();

    expect(element.type).toBe(CategoryAlertsForm);
    expect(element.props.alerts).toBe(
      DEFAULT_CATEGORY_ALERTS
    );
  });
});
