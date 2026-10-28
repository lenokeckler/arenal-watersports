import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  WORKER_ACCOUNT_STATE,
  GRANTABLE_WORKER_MARKS,
  SUPABASE_WORK_AREA,
  SUPABASE_WORKER_MARK,
  WORKER_AREA_FIELD,
  WORKER_AREA_INTENT,
  WORKER_MARK_FIELD,
} from "@/app/constants";
import WorkerMarkNotice from "../components/WorkerMarkNotice";
import WorkerMarksPanel from "../components/WorkerMarksPanel";
import {
  WORKER_AREAS_COPY,
  WORKER_MARK_CHANGED_NOTICE,
  WORKER_MARK_DESCRIPTION,
  WORKER_MARK_LABEL,
} from "../constants/WorkerAreasCopy.constants";
import { readWorkerAreasSearch } from "../utils/readWorkerAreasSearch";
import { resolveWorkerMarkStatus } from "../utils/resolveWorkerMarkStatus";

vi.mock("@/app/services/worker-areas", () => ({
  changeWorkerMarkAsSignedIn: vi.fn(),
}));

const OVERVIEW = {
  accountState: WORKER_ACCOUNT_STATE.ACTIVE,
  hasPersonalEmail: false,
  areas: [SUPABASE_WORK_AREA.OPERATIONS],
  baseRole: SUPABASE_WORK_AREA.OPERATIONS,
  fullName: "Celso Rojas",
  id: "33333333-3333-3333-3333-333333333333",
  isExternalGuide: false,
  marks: [],
  username: "celso",
};

const GUIDE = SUPABASE_WORKER_MARK.GUIDE;

describe("resolveWorkerMarkStatus", () => {
  it("offers to put a missing mark", () => {
    expect(
      resolveWorkerMarkStatus(OVERVIEW, GUIDE)
    ).toEqual({
      intent: WORKER_AREA_INTENT.GRANT,
      label: WORKER_AREAS_COPY.MARK_NOT_SET,
    });
  });

  it("offers to remove a mark that is set", () => {
    expect(
      resolveWorkerMarkStatus(
        { ...OVERVIEW, marks: [GUIDE] },
        GUIDE
      )
    ).toEqual({
      intent: WORKER_AREA_INTENT.REVOKE,
      label: WORKER_AREAS_COPY.MARK_SET,
    });
  });
});

describe("readWorkerAreasSearch for marks", () => {
  it("reads the mark notice", () => {
    expect(
      readWorkerAreasSearch({
        [WORKER_AREA_FIELD.USERNAME]: OVERVIEW.username,
        [WORKER_MARK_FIELD.MARK]: GUIDE,
        [WORKER_MARK_FIELD.MARK_NOTICE]:
          WORKER_AREA_INTENT.REVOKE,
      })
    ).toMatchObject({
      mark: GUIDE,
      markNotice: WORKER_AREA_INTENT.REVOKE,
    });
  });

  it("ignores a mark that is not offered here", () => {
    expect(
      readWorkerAreasSearch({
        [WORKER_MARK_FIELD.MARK]:
          SUPABASE_WORKER_MARK.EXTERNAL_GUIDE_REGISTRATION,
      })
    ).toMatchObject({ mark: null });
  });
});

describe("WorkerMarksPanel", () => {
  it("shows the guide mark, what it does and Poner for every missing mark", () => {
    render(<WorkerMarksPanel overview={OVERVIEW} />);

    expect(
      screen.getByText(WORKER_MARK_LABEL[GUIDE])
    ).toBeInTheDocument();
    expect(
      screen.getByText(WORKER_MARK_DESCRIPTION[GUIDE])
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", {
        name: WORKER_AREAS_COPY.MARK_GRANT,
      })
    ).toHaveLength(GRANTABLE_WORKER_MARKS.length);
  });

  it("offers Quitar when the mark is set", () => {
    render(
      <WorkerMarksPanel
        overview={{ ...OVERVIEW, marks: [GUIDE] }}
      />
    );

    expect(
      screen.getByText(WORKER_AREAS_COPY.MARK_SET)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: WORKER_AREAS_COPY.REVOKE,
      })
    ).toBeInTheDocument();
  });
});

describe("WorkerMarksPanel with both marks", () => {
  it("offers the general manager mark next to the guide one and says what it enables", () => {
    render(
      <WorkerMarksPanel
        overview={{
          ...OVERVIEW,
          marks: [SUPABASE_WORKER_MARK.GENERAL_MANAGER],
        }}
      />
    );

    expect(
      screen.getByText(
        WORKER_MARK_LABEL[
          SUPABASE_WORKER_MARK.GENERAL_MANAGER
        ]
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        WORKER_MARK_DESCRIPTION[
          SUPABASE_WORKER_MARK.GENERAL_MANAGER
        ]
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: WORKER_AREAS_COPY.REVOKE,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: WORKER_AREAS_COPY.MARK_GRANT,
      })
    ).toBeInTheDocument();
  });
});

describe("WorkerMarkNotice", () => {
  it("says which mark was put", () => {
    render(
      <WorkerMarkNotice
        search={{
          area: null,
          mark: GUIDE,
          markNotice: WORKER_AREA_INTENT.GRANT,
          notice: null,
          username: OVERVIEW.username,
        }}
      />
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      WORKER_MARK_CHANGED_NOTICE[WORKER_AREA_INTENT.GRANT](
        WORKER_MARK_LABEL[GUIDE]
      )
    );
  });
});
