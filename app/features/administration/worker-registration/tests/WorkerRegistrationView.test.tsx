import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  SUPABASE_WORK_AREA,
  WORKER_REGISTRATION_ERROR_CODE,
  WORKER_REGISTRATION_FIELD,
} from "@/app/constants";
import {
  WORKER_REGISTRATION_COPY,
  WORKER_REGISTRATION_ERROR_COPY,
} from "../constants/WorkerRegistrationCopy.constants";
import { WORKER_REGISTRATION_STATUS } from "../constants/WorkerRegistrationStatus.constants";
import type { WorkerRegistrationState } from "../models/WorkerRegistrationState.type";
import WorkerRegistrationView from "../WorkerRegistrationView";
import { ACTION_FIXTURE } from "./WorkerRegistrationAction.constants";

const REGISTERED_STATE: WorkerRegistrationState = {
  status: WORKER_REGISTRATION_STATUS.REGISTERED,
  registered: {
    baseRole: SUPABASE_WORK_AREA.OPERATIONS,
    fullName: ACTION_FIXTURE.FULL_NAME,
    temporaryPassword: ACTION_FIXTURE.TEMPORARY_PASSWORD,
    username: ACTION_FIXTURE.USERNAME,
  },
};

const INVALID_STATE: WorkerRegistrationState = {
  status: WORKER_REGISTRATION_STATUS.INVALID,
  fieldErrors: {
    [WORKER_REGISTRATION_FIELD.FULL_NAME]:
      WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_REQUIRED,
    [WORKER_REGISTRATION_FIELD.USERNAME]:
      WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN,
  },
};

const renderView = (answer: WorkerRegistrationState) => {
  const action = vi.fn().mockResolvedValue(answer);
  render(<WorkerRegistrationView action={action} />);

  return { action, user: userEvent.setup() };
};

const getFullName = () =>
  screen.getByLabelText(
    WORKER_REGISTRATION_COPY.FULL_NAME_LABEL
  );
const getUsername = () =>
  screen.getByLabelText(
    WORKER_REGISTRATION_COPY.USERNAME_LABEL
  );
const getBaseRole = () =>
  screen.getByLabelText(
    WORKER_REGISTRATION_COPY.BASE_ROLE_LABEL
  );
const getSubmit = () =>
  screen.getByRole("button", {
    name: WORKER_REGISTRATION_COPY.SUBMIT,
  });

describe("WorkerRegistrationView", () => {
  it("offers the name, the username and only the assignable roles", () => {
    renderView(REGISTERED_STATE);

    expect(getFullName()).toHaveValue("");
    expect(getUsername()).toHaveValue("");
    expect(getBaseRole()).toHaveValue("");
    expect(
      screen
        .getAllByRole("option")
        .map((option) => option.getAttribute("value"))
    ).toEqual([
      SUPABASE_WORK_AREA.RESERVATIONS,
      SUPABASE_WORK_AREA.OPERATIONS,
    ]);
  });

  it("sends the typed values to the action", async () => {
    const { action, user } = renderView(REGISTERED_STATE);

    await user.type(
      getFullName(),
      ACTION_FIXTURE.FULL_NAME
    );
    await user.type(getUsername(), ACTION_FIXTURE.USERNAME);
    await user.selectOptions(
      getBaseRole(),
      SUPABASE_WORK_AREA.OPERATIONS
    );
    await user.click(getSubmit());

    await waitFor(() => expect(action).toHaveBeenCalled());
    const formData: FormData = action.mock.calls[0][1];
    expect(
      formData.get(WORKER_REGISTRATION_FIELD.FULL_NAME)
    ).toBe(ACTION_FIXTURE.FULL_NAME);
    expect(
      formData.get(WORKER_REGISTRATION_FIELD.USERNAME)
    ).toBe(ACTION_FIXTURE.USERNAME);
    expect(
      formData.get(WORKER_REGISTRATION_FIELD.BASE_ROLE)
    ).toBe(SUPABASE_WORK_AREA.OPERATIONS);
  });

  it("shows each refusal on its field and focuses the first one", async () => {
    const { user } = renderView(INVALID_STATE);

    await user.click(getSubmit());

    expect(
      await screen.findByText(
        WORKER_REGISTRATION_ERROR_COPY[
          WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_REQUIRED
        ]
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        WORKER_REGISTRATION_ERROR_COPY[
          WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN
        ]
      )
    ).toBeInTheDocument();
    expect(getFullName()).toHaveFocus();
  });

  it("drops the error of a field once it is edited", async () => {
    const { user } = renderView(INVALID_STATE);
    await user.click(getSubmit());
    const usernameError = await screen.findByText(
      WORKER_REGISTRATION_ERROR_COPY[
        WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN
      ]
    );

    await user.type(getUsername(), ACTION_FIXTURE.USERNAME);

    expect(usernameError).not.toBeInTheDocument();
    expect(
      screen.getByText(
        WORKER_REGISTRATION_ERROR_COPY[
          WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_REQUIRED
        ]
      )
    ).toBeInTheDocument();
  });

  it("shows a refusal of the whole form in the banner", async () => {
    const { user } = renderView({
      status: WORKER_REGISTRATION_STATUS.INVALID,
      fieldErrors: {
        [WORKER_REGISTRATION_FIELD.FORM]:
          WORKER_REGISTRATION_ERROR_CODE.NOT_ALLOWED,
      },
    });

    await user.click(getSubmit());

    expect(
      await screen.findByText(
        WORKER_REGISTRATION_ERROR_COPY[
          WORKER_REGISTRATION_ERROR_CODE.NOT_ALLOWED
        ]
      )
    ).toBeInTheDocument();
  });

  it("shows the registered worker and the temporary password once", async () => {
    const { user } = renderView(REGISTERED_STATE);

    await user.click(getSubmit());

    expect(
      await screen.findByText(
        WORKER_REGISTRATION_COPY.REGISTERED_NOTICE(
          ACTION_FIXTURE.FULL_NAME,
          ACTION_FIXTURE.USERNAME
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(ACTION_FIXTURE.TEMPORARY_PASSWORD)
    ).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  it("starts an empty form to register another worker", async () => {
    const { user } = renderView(REGISTERED_STATE);
    await user.click(getSubmit());

    await user.click(
      await screen.findByRole("button", {
        name: WORKER_REGISTRATION_COPY.REGISTER_ANOTHER,
      })
    );

    expect(getFullName()).toHaveValue("");
    expect(
      screen.queryByText(ACTION_FIXTURE.TEMPORARY_PASSWORD)
    ).toBeNull();
  });
});
