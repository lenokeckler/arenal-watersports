import { PATHS } from "@/app/constants";

const SYSTEM_ROUTE_CATEGORY_ID =
  "11111111-0000-0000-0000-000000000001";

export const SYSTEM_ROUTE_DEFAULTS = {
  categoryId: SYSTEM_ROUTE_CATEGORY_ID,
  invalidCategoryId: "invalid-category",
  queryError: {
    code: "XX000",
    details: "Fixture lookup failed.",
    hint: "",
    message: "Fixture lookup failed.",
  },
  readError: new Error("Seeded category lookup failed."),
  readerResult: {
    data: { category_id: SYSTEM_ROUTE_CATEGORY_ID },
    error: null,
  },
  staticRoute: PATHS.PROFILE.ROOT,
} as const;
