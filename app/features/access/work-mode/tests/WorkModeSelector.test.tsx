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
  WORK_AREA_LABEL,
  WORK_MODE_FIELD,
  WORK_MODE_RESULT,
} from "@/app/constants";
import {
  chooseWorkAreaAsSignedIn,
  readWorkModeOverviewAsSignedIn,
} from "@/app/services/work-mode";
import { submitWorkModeChoice } from "../actions/submitWorkModeChoice";
import WorkModeCard from "../components/WorkModeCard";
import {
  WORK_MODE_COPY,
  WORK_MODE_ERROR,
} from "../constants/WorkModeCopy.constants";
import WorkModeGate from "../WorkModeGate";
import WorkModeSelector from "../WorkModeSelector";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/app/services/work-mode", () => ({
  chooseWorkAreaAsSignedIn: vi.fn(),
  readWorkModeOverviewAsSignedIn: vi.fn(),
}));

const BOTH = [
  SUPABASE_WORK_AREA.RESERVATIONS,
  SUPABASE_WORK_AREA.OPERATIONS,
];

const areaForm = (area: string): FormData => {
  const formData = new FormData();
  formData.set(WORK_MODE_FIELD.AREA, area);

  return formData;
};

describe("submitWorkModeChoice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sets the mode and returns to the home", async () => {
    vi.mocked(chooseWorkAreaAsSignedIn).mockResolvedValue(
      WORK_MODE_RESULT.CHOSEN
    );

    await expect(
      submitWorkModeChoice(
        null,
        areaForm(SUPABASE_WORK_AREA.OPERATIONS)
      )
    ).rejects.toThrow();
    expect(chooseWorkAreaAsSignedIn).toHaveBeenCalledWith(
      SUPABASE_WORK_AREA.OPERATIONS
    );
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("changes nothing for an unknown area", async () => {
    expect(
      await submitWorkModeChoice(null, areaForm("gerencia"))
    ).toBe(WORK_MODE_RESULT.FAILED);
    expect(chooseWorkAreaAsSignedIn).not.toHaveBeenCalled();
  });

  it("answers a refusal to the card", async () => {
    vi.mocked(chooseWorkAreaAsSignedIn).mockResolvedValue(
      WORK_MODE_RESULT.NOT_ENABLED
    );

    expect(
      await submitWorkModeChoice(
        null,
        areaForm(SUPABASE_WORK_AREA.OPERATIONS)
      )
    ).toBe(WORK_MODE_RESULT.NOT_ENABLED);
    expect(redirect).not.toHaveBeenCalled();
  });
});

describe("WorkModeCard", () => {
  it("posts its area and shows a refusal", async () => {
    const action = vi
      .fn()
      .mockResolvedValue(WORK_MODE_RESULT.NOT_ENABLED);
    const user = userEvent.setup();
    render(
      <WorkModeCard
        action={action}
        area={SUPABASE_WORK_AREA.RESERVATIONS}
        isCurrent
      />
    );

    expect(
      screen.getByText(WORK_MODE_COPY.CURRENT)
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button"));

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      WORK_MODE_ERROR[WORK_MODE_RESULT.NOT_ENABLED]
    );
    const formData: FormData = action.mock.calls[0][1];
    expect(formData.get(WORK_MODE_FIELD.AREA)).toBe(
      SUPABASE_WORK_AREA.RESERVATIONS
    );
  });
});

describe("WorkModeSelector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows one large card per enabled area, Operaciones first", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue({
      areas: BOTH,
      current: null,
    });

    render(await WorkModeSelector());

    expect(
      screen
        .getAllByRole("button")
        .map((button) => button.textContent)
    ).toEqual([
      expect.stringContaining(
        WORK_AREA_LABEL[SUPABASE_WORK_AREA.OPERATIONS]
      ),
      expect.stringContaining(
        WORK_AREA_LABEL[SUPABASE_WORK_AREA.RESERVATIONS]
      ),
    ]);
  });

  it("sends an account with a single area to the home", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue({
      areas: [SUPABASE_WORK_AREA.OPERATIONS],
      current: SUPABASE_WORK_AREA.OPERATIONS,
    });

    await expect(WorkModeSelector()).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("sends a visitor without an account to the login", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue(null);

    await expect(WorkModeSelector()).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.LOGIN
    );
  });
});

describe("WorkModeGate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends a multi-area account without a mode to the selector", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue({
      areas: BOTH,
      current: null,
    });

    await expect(WorkModeGate()).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.MODE);
  });

  it.each([
    [
      {
        areas: BOTH,
        current: SUPABASE_WORK_AREA.RESERVATIONS,
      },
    ],
    [
      {
        areas: [SUPABASE_WORK_AREA.OPERATIONS],
        current: SUPABASE_WORK_AREA.OPERATIONS,
      },
    ],
  ])("lets %j stay on the home", async (overview) => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue(overview);

    expect(await WorkModeGate()).toBeNull();
    expect(redirect).not.toHaveBeenCalled();
  });
});
