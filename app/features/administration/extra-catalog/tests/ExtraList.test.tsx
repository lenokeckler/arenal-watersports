import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import ExtraList from "../ExtraList";
import { listExtras } from "../services/listExtras";
import { DEFAULT_EXTRA } from "./Extra.constants";
import {
  LAST_PAGE_COUNT,
  LAST_PAGE_HREF,
  MIDDLE_PAGE,
  MIDDLE_PAGE_COUNT,
  PAGE_PAST_THE_END,
  REDIRECT_ERROR_MESSAGE,
  throwNavigation,
} from "./ExtraList.constants";

const mockedAdministratorCheck = vi.mocked(
  isAdministratorSignedIn
);
const mockedExtrasRead = vi.mocked(listExtras);

const redirectMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/listExtras");

const renderExtraList = (pageParam?: string) =>
  ExtraList({ pageParam });

describe("ExtraList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirectMock.mockImplementation(
      throwNavigation(REDIRECT_ERROR_MESSAGE)
    );
    mockedAdministratorCheck.mockResolvedValue(true);
    mockedExtrasRead.mockResolvedValue({
      extras: [DEFAULT_EXTRA],
      pageCount: 1,
      totalCount: 1,
    });
  });

  it("redirects a worker who is not an administrator home without reading any extra", async () => {
    mockedAdministratorCheck.mockResolvedValue(false);

    await expect(renderExtraList()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(listExtras).not.toHaveBeenCalled();
  });

  it("flags a failed read when the extras cannot be loaded", async () => {
    mockedExtrasRead.mockRejectedValue(
      new Error("read failed")
    );

    const element = await renderExtraList();

    expect(element.props.fetchFailed).toBe(true);
  });

  it("reads the page named in the address and passes its extras to the view", async () => {
    mockedExtrasRead.mockResolvedValue({
      extras: [DEFAULT_EXTRA],
      pageCount: MIDDLE_PAGE_COUNT,
      totalCount: MIDDLE_PAGE_COUNT,
    });

    const element = await renderExtraList(`${MIDDLE_PAGE}`);

    expect(listExtras).toHaveBeenCalledWith(MIDDLE_PAGE);
    expect(element.props).toEqual({
      currentPage: MIDDLE_PAGE,
      extras: [DEFAULT_EXTRA],
      fetchFailed: false,
      pageCount: MIDDLE_PAGE_COUNT,
    });
  });

  it("sends the worker to the last page when the requested page is past the end", async () => {
    mockedExtrasRead.mockResolvedValue({
      extras: [],
      pageCount: LAST_PAGE_COUNT,
      totalCount: LAST_PAGE_COUNT,
    });

    await expect(
      renderExtraList(PAGE_PAST_THE_END)
    ).rejects.toThrow(REDIRECT_ERROR_MESSAGE);

    expect(redirectMock).toHaveBeenCalledWith(
      LAST_PAGE_HREF
    );
  });
});
