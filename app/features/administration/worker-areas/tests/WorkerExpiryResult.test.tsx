import { render, screen } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import WorkerAreasResult from "../components/WorkerAreasResult";
import { WORKER_AREAS_COPY } from "../constants/WorkerAreasCopy.constants";
import { WORKER_EXPIRY_COPY } from "../constants/WorkerExpiryCopy.constants";
import {
  EXTERNAL_GUIDE_OVERVIEW,
  WORKER_EXPIRY_TEST,
} from "./WorkerExpiry.constants";

vi.mock("@/app/services/worker-areas", () => ({
  extendWorkerExpiryAsSignedIn: vi.fn(),
}));

describe("WorkerAreasResult for an external guide", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(WORKER_EXPIRY_TEST.NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("keeps saying that the guide gets no areas or marks and adds the expiry section", () => {
    render(
      <WorkerAreasResult
        overview={EXTERNAL_GUIDE_OVERVIEW}
        username={EXTERNAL_GUIDE_OVERVIEW.username}
      />
    );

    expect(
      screen.getByText(WORKER_AREAS_COPY.EXTERNAL_GUIDE)
    ).toBeInTheDocument();
    expect(
      screen.getByText(WORKER_EXPIRY_COPY.TITLE)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: WORKER_EXPIRY_COPY.EXTEND,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: WORKER_AREAS_COPY.GRANT,
      })
    ).not.toBeInTheDocument();
  });

  it("shows no expiry section for a guide without an expiry date", () => {
    render(
      <WorkerAreasResult
        overview={{
          ...EXTERNAL_GUIDE_OVERVIEW,
          expiresAt: null,
        }}
        username={EXTERNAL_GUIDE_OVERVIEW.username}
      />
    );

    expect(
      screen.queryByText(WORKER_EXPIRY_COPY.TITLE)
    ).not.toBeInTheDocument();
  });
});
