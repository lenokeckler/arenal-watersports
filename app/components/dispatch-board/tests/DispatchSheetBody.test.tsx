import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DispatchSheetBody from "../components/DispatchSheetBody";
import {
  DISPATCH_SHEET_COPY,
  DISPATCH_SHEET_PHASE,
} from "../constants/DispatchSheetCopy.constants";
import type { DispatchSheetViewModel } from "../models/DispatchSheetViewModel.interface";
import { createDispatchSheetPage } from "./DispatchSheet.page";
import {
  MOTOR_GROUP_FIXTURE,
  UNIT_GROUP_FIXTURE,
} from "./DispatchSheetGroup.fixtures";

const buildViewModel = (
  overrides: Partial<DispatchSheetViewModel> = {}
): DispatchSheetViewModel => ({
  errorMessage: null,
  groups: [],
  handleBack: vi.fn(),
  handleSelectGroup: vi.fn(),
  handleSubmitGroup: vi.fn(),
  isSubmitting: false,
  phase: DISPATCH_SHEET_PHASE.READY,
  selectedGroup: null,
  ...overrides,
});

describe("DispatchSheetBody", () => {
  it("says it is loading the equipment", () => {
    render(
      <DispatchSheetBody
        viewModel={buildViewModel({
          phase: DISPATCH_SHEET_PHASE.LOADING,
        })}
      />
    );

    expect(
      screen.getByText(DISPATCH_SHEET_COPY.LOADING)
    ).toBeInTheDocument();
  });

  it("alerts when the equipment could not be loaded", () => {
    render(
      <DispatchSheetBody
        viewModel={buildViewModel({
          phase: DISPATCH_SHEET_PHASE.FAILED,
        })}
      />
    );

    expect(
      createDispatchSheetPage().getAlert()
    ).toHaveTextContent(DISPATCH_SHEET_COPY.LOAD_ERROR);
  });

  it("says nothing is left to dispatch", () => {
    render(
      <DispatchSheetBody viewModel={buildViewModel()} />
    );

    expect(
      screen.getByText(DISPATCH_SHEET_COPY.NOTHING_LEFT)
    ).toBeInTheDocument();
  });

  it("lets operations choose the category that leaves now", async () => {
    const viewModel = buildViewModel({
      groups: [UNIT_GROUP_FIXTURE, MOTOR_GROUP_FIXTURE],
    });
    render(<DispatchSheetBody viewModel={viewModel} />);

    await userEvent.click(
      createDispatchSheetPage().getGroupButton(
        MOTOR_GROUP_FIXTURE.categoryName
      )
    );

    expect(
      viewModel.handleSelectGroup
    ).toHaveBeenCalledWith(MOTOR_GROUP_FIXTURE.categoryId);
  });

  it("shows the form of the chosen category and a way back", async () => {
    const viewModel = buildViewModel({
      groups: [UNIT_GROUP_FIXTURE, MOTOR_GROUP_FIXTURE],
      selectedGroup: UNIT_GROUP_FIXTURE,
    });
    render(<DispatchSheetBody viewModel={viewModel} />);
    const sheet = createDispatchSheetPage();

    expect(sheet.getSubmit()).toBeInTheDocument();

    await userEvent.click(sheet.getBackButton());

    expect(viewModel.handleBack).toHaveBeenCalledOnce();
  });

  it("offers no way back when only one category is left", () => {
    render(
      <DispatchSheetBody
        viewModel={buildViewModel({
          groups: [UNIT_GROUP_FIXTURE],
          selectedGroup: UNIT_GROUP_FIXTURE,
        })}
      />
    );

    expect(
      screen.queryByText(DISPATCH_SHEET_COPY.BACK)
    ).not.toBeInTheDocument();
  });

  it("shows the error of the last attempt", () => {
    render(
      <DispatchSheetBody
        viewModel={buildViewModel({
          errorMessage: DISPATCH_SHEET_COPY.SUBMIT_ERROR,
          groups: [UNIT_GROUP_FIXTURE],
          selectedGroup: UNIT_GROUP_FIXTURE,
        })}
      />
    );

    expect(
      createDispatchSheetPage().getAlert()
    ).toHaveTextContent(DISPATCH_SHEET_COPY.SUBMIT_ERROR);
  });
});
