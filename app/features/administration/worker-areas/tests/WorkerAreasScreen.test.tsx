import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import {
  PATHS,
  SUPABASE_WORK_AREA,
  WORKER_AREA_CHANGE_RESULT,
  WORKER_AREA_FIELD,
  WORKER_AREA_INTENT,
} from "@/app/constants";
import { readWorkerAreasOverviewAsSignedIn } from "@/app/services/worker-areas";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import WorkerAreaChangeForm from "../components/WorkerAreaChangeForm";
import {
  WORKER_AREA_CHANGE_ERROR,
  WORKER_AREAS_COPY,
} from "../constants/WorkerAreasCopy.constants";
import { readWorkerAreasSearch } from "../utils/readWorkerAreasSearch";
import { resolveWorkerAreaStatus } from "../utils/resolveWorkerAreaStatus";
import WorkerAreas from "../WorkerAreas";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("@/app/services/worker-areas", () => ({
  changeWorkerAreaAsSignedIn: vi.fn(),
  readWorkerAreasOverviewAsSignedIn: vi.fn(),
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

const OVERVIEW = {
  areas: [
    SUPABASE_WORK_AREA.OPERATIONS,
    SUPABASE_WORK_AREA.RESERVATIONS,
  ],
  baseRole: SUPABASE_WORK_AREA.OPERATIONS,
  fullName: "Celso Rojas",
  id: "33333333-3333-3333-3333-333333333333",
  isExternalGuide: false,
  username: "celso",
};

describe("resolveWorkerAreaStatus", () => {
  it("locks the base area", () => {
    expect(
      resolveWorkerAreaStatus(
        OVERVIEW,
        SUPABASE_WORK_AREA.OPERATIONS
      )
    ).toEqual({
      intent: null,
      label: WORKER_AREAS_COPY.AREA_IS_BASE,
    });
  });

  it("offers to remove an enabled area", () => {
    expect(
      resolveWorkerAreaStatus(
        OVERVIEW,
        SUPABASE_WORK_AREA.RESERVATIONS
      )
    ).toEqual({
      intent: WORKER_AREA_INTENT.REVOKE,
      label: WORKER_AREAS_COPY.AREA_ENABLED,
    });
  });

  it("offers to enable a missing area", () => {
    expect(
      resolveWorkerAreaStatus(
        {
          ...OVERVIEW,
          areas: [SUPABASE_WORK_AREA.OPERATIONS],
        },
        SUPABASE_WORK_AREA.RESERVATIONS
      )
    ).toEqual({
      intent: WORKER_AREA_INTENT.GRANT,
      label: WORKER_AREAS_COPY.AREA_NOT_ENABLED,
    });
  });
});

describe("readWorkerAreasSearch", () => {
  it("reads the username, the notice and the area", () => {
    expect(
      readWorkerAreasSearch({
        [WORKER_AREA_FIELD.AREA]:
          SUPABASE_WORK_AREA.RESERVATIONS,
        [WORKER_AREA_FIELD.NOTICE]:
          WORKER_AREA_INTENT.GRANT,
        [WORKER_AREA_FIELD.USERNAME]: " Celso ",
      })
    ).toEqual({
      area: SUPABASE_WORK_AREA.RESERVATIONS,
      notice: WORKER_AREA_INTENT.GRANT,
      username: OVERVIEW.username,
    });
  });

  it("ignores unknown or repeated values", () => {
    expect(
      readWorkerAreasSearch({
        [WORKER_AREA_FIELD.AREA]:
          SUPABASE_WORK_AREA.ADMINISTRATION,
        [WORKER_AREA_FIELD.NOTICE]: "<script>",
        [WORKER_AREA_FIELD.USERNAME]: [OVERVIEW.username],
      })
    ).toEqual({ area: null, notice: null, username: "" });
  });
});

describe("WorkerAreaChangeForm", () => {
  it("posts the area, the intent and the worker, and shows a refusal", async () => {
    const action = vi
      .fn()
      .mockResolvedValue(
        WORKER_AREA_CHANGE_RESULT.BASE_AREA
      );
    const user = userEvent.setup();
    render(
      <WorkerAreaChangeForm
        action={action}
        area={SUPABASE_WORK_AREA.RESERVATIONS}
        intent={WORKER_AREA_INTENT.REVOKE}
        username={OVERVIEW.username}
        workerId={OVERVIEW.id}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: WORKER_AREAS_COPY.REVOKE,
      })
    );

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      WORKER_AREA_CHANGE_ERROR[
        WORKER_AREA_CHANGE_RESULT.BASE_AREA
      ]
    );
    const formData: FormData = action.mock.calls[0][1];
    expect(Object.fromEntries(formData)).toEqual({
      [WORKER_AREA_FIELD.AREA]:
        SUPABASE_WORK_AREA.RESERVATIONS,
      [WORKER_AREA_FIELD.INTENT]: WORKER_AREA_INTENT.REVOKE,
      [WORKER_AREA_FIELD.USERNAME]: OVERVIEW.username,
      [WORKER_AREA_FIELD.WORKER_ID]: OVERVIEW.id,
    });
  });
});

describe("WorkerAreas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends anyone who is not administration to the home", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(
      WorkerAreas({ query: {} })
    ).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("reads no worker until a username is searched", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );

    render(await WorkerAreas({ query: {} }));

    expect(
      readWorkerAreasOverviewAsSignedIn
    ).not.toHaveBeenCalled();
    expect(
      screen.queryByText(WORKER_AREAS_COPY.NOT_FOUND)
    ).toBeNull();
  });

  it("says so when the username does not exist", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(
      readWorkerAreasOverviewAsSignedIn
    ).mockResolvedValue(null);

    render(
      await WorkerAreas({
        query: { [WORKER_AREA_FIELD.USERNAME]: "nadie" },
      })
    );

    expect(
      screen.getByText(WORKER_AREAS_COPY.NOT_FOUND)
    ).toBeInTheDocument();
  });

  it("offers no areas to an external guide", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(
      readWorkerAreasOverviewAsSignedIn
    ).mockResolvedValue({
      ...OVERVIEW,
      isExternalGuide: true,
    });

    render(
      await WorkerAreas({
        query: {
          [WORKER_AREA_FIELD.USERNAME]: OVERVIEW.username,
        },
      })
    );

    expect(
      screen.getByText(WORKER_AREAS_COPY.EXTERNAL_GUIDE)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: WORKER_AREAS_COPY.GRANT,
      })
    ).toBeNull();
  });

  it("shows the worker with the base area locked and the extra one removable", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(
      readWorkerAreasOverviewAsSignedIn
    ).mockResolvedValue(OVERVIEW);

    render(
      await WorkerAreas({
        query: {
          [WORKER_AREA_FIELD.USERNAME]: OVERVIEW.username,
        },
      })
    );

    expect(
      screen.getByText(
        WORKER_AREAS_COPY.WORKER_SUMMARY(
          OVERVIEW.fullName,
          OVERVIEW.username
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(WORKER_AREAS_COPY.AREA_IS_BASE)
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", {
        name: WORKER_AREAS_COPY.REVOKE,
      })
    ).toHaveLength(1);
  });
});
