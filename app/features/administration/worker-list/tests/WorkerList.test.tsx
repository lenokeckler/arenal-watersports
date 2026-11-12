import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import type { WorkerListSearchParameters } from "@/app/services/worker-list/models/WorkerListSearchParameters.type";
import WorkerList from "../WorkerList";
import { WORKER_LIST_REDIRECT_SIGNAL } from "./WorkerList.constants";

const workerListMocks = vi.hoisted(() => ({
  readWorkerListPage: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: workerListMocks.redirect,
}));

vi.mock(
  "@/app/services/worker-list/readWorkerListPage",
  () => ({
    readWorkerListPage: workerListMocks.readWorkerListPage,
  })
);

const redirectSignal = new Error(
  WORKER_LIST_REDIRECT_SIGNAL
);
const emptySearchParameters: WorkerListSearchParameters =
  {};

describe("WorkerList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    workerListMocks.readWorkerListPage.mockResolvedValue(
      null
    );
    workerListMocks.redirect.mockImplementation(() => {
      throw redirectSignal;
    });
  });

  it("redirects a denied request before rendering worker rows", async () => {
    await expect(
      WorkerList({
        searchParameters: emptySearchParameters,
      })
    ).rejects.toThrow(redirectSignal);

    expect(workerListMocks.redirect).toHaveBeenCalledWith(
      PATHS.HOME
    );
  });
});
