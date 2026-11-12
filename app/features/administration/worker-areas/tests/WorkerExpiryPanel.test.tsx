import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { WORKER_ACCOUNT_STATE } from "@/app/constants";
import WorkerExpiryPanel from "../components/WorkerExpiryPanel";
import { WORKER_EXPIRY_COPY } from "../constants/WorkerExpiryCopy.constants";
import { formatWorkerExpiryDate } from "../utils/formatWorkerExpiryDate";
import {
  EXTERNAL_GUIDE_OVERVIEW,
  WORKER_EXPIRY_TEST,
} from "./WorkerExpiry.constants";

vi.mock("@/app/services/worker-areas", () => ({
  extendWorkerExpiryAsSignedIn: vi.fn(),
}));

const withExpiry = (expiresAt: string | null) => ({
  ...EXTERNAL_GUIDE_OVERVIEW,
  expiresAt,
});

describe("WorkerExpiryPanel", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(WORKER_EXPIRY_TEST.NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("says an expired account cannot enter and offers the new date", () => {
    render(
      <WorkerExpiryPanel
        overview={withExpiry(WORKER_EXPIRY_TEST.EXPIRED_AT)}
      />
    );

    expect(
      screen.getByText(
        WORKER_EXPIRY_COPY.EXPIRED_ON(
          formatWorkerExpiryDate(
            WORKER_EXPIRY_TEST.EXPIRED_AT
          )
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(WORKER_EXPIRY_COPY.DATE_LABEL)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: WORKER_EXPIRY_COPY.EXTEND,
      })
    ).toBeInTheDocument();
  });

  it("offers the extension to an account that is about to expire", () => {
    render(
      <WorkerExpiryPanel
        overview={withExpiry(
          WORKER_EXPIRY_TEST.EXPIRING_AT
        )}
      />
    );

    expect(
      screen.getByText(
        WORKER_EXPIRY_COPY.EXPIRES_ON(
          formatWorkerExpiryDate(
            WORKER_EXPIRY_TEST.EXPIRING_AT
          )
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: WORKER_EXPIRY_COPY.EXTEND,
      })
    ).toBeInTheDocument();
  });

  it("only shows the date when the account has plenty of time left", () => {
    render(
      <WorkerExpiryPanel
        overview={withExpiry(WORKER_EXPIRY_TEST.VALID_AT)}
      />
    );

    expect(
      screen.getByText(
        WORKER_EXPIRY_COPY.EXPIRES_ON(
          formatWorkerExpiryDate(
            WORKER_EXPIRY_TEST.VALID_AT
          )
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: WORKER_EXPIRY_COPY.EXTEND,
      })
    ).not.toBeInTheDocument();
  });

  it.each([
    [
      "a worker that is not an external guide",
      {
        ...EXTERNAL_GUIDE_OVERVIEW,
        isExternalGuide: false,
      },
    ],
    ["an account without an expiry", withExpiry(null)],
    [
      "a retired account",
      {
        ...EXTERNAL_GUIDE_OVERVIEW,
        accountState: WORKER_ACCOUNT_STATE.RETIRED,
      },
    ],
  ])("shows nothing for %s", (_name, overview) => {
    const { container } = render(
      <WorkerExpiryPanel overview={overview} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("keeps the typed date in the field", async () => {
    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime,
    });
    render(
      <WorkerExpiryPanel
        overview={withExpiry(WORKER_EXPIRY_TEST.EXPIRED_AT)}
      />
    );

    await user.type(
      screen.getByLabelText(WORKER_EXPIRY_COPY.DATE_LABEL),
      WORKER_EXPIRY_TEST.NEW_DATE
    );

    expect(
      screen.getByLabelText(WORKER_EXPIRY_COPY.DATE_LABEL)
    ).toHaveValue(WORKER_EXPIRY_TEST.NEW_DATE);
  });
});
