import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { PATHS } from "@/app/constants";
import type { Extra } from "../models/Extra.interface";
import type { ExtraListViewProps } from "../models/ExtraListViewProps.interface";
import { DEFAULT_EXTRA } from "./Extra.constants";

export const FIRST_PAGE_COUNT = 1;
export const LAST_PAGE_COUNT = 2;
export const MIDDLE_PAGE = 2;
export const MIDDLE_PAGE_COUNT = 3;
export const PAGE_PAST_THE_END = "9";
export const REDIRECT_ERROR_MESSAGE = "NEXT_REDIRECT";
export const NOT_FOUND_ERROR_MESSAGE = "NEXT_NOT_FOUND";
export const SECOND_EXTRA_ID = "second-extra-id";
export const SECOND_EXTRA_NAME = "Parrilla";

export const LAST_PAGE_HREF = resolveListPageHref(
  PATHS.ADMINISTRATION.EXTRAS,
  LAST_PAGE_COUNT
);

export const throwNavigation = (message: string) => () => {
  throw new Error(message);
};

export const DEFAULT_EXTRA_LIST_VIEW_PROPS: ExtraListViewProps =
  {
    currentPage: 1,
    extras: [DEFAULT_EXTRA],
    fetchFailed: false,
    pageCount: FIRST_PAGE_COUNT,
  };

export const buildExtra = (
  overrides: Partial<Extra> = {}
): Extra => ({
  ...DEFAULT_EXTRA,
  ...overrides,
});

export const buildExtraListViewProps = (
  overrides: Partial<ExtraListViewProps> = {}
): ExtraListViewProps => ({
  ...DEFAULT_EXTRA_LIST_VIEW_PROPS,
  ...overrides,
});
