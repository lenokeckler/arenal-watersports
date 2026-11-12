import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import ProfileIdentityCard from "../ProfileIdentityCard";
import { PROFILE_IDENTITY_COPY } from "../constants/ProfileIdentityCopy.constants";
import { PROFILE_IDENTITY } from "./ProfileIdentity.constants";

it("shows the name, the username, the role, the areas and the marks of the person", () => {
  render(
    <ProfileIdentityCard identity={PROFILE_IDENTITY} />
  );

  expect(
    screen.getByText("Ana María Rojas")
  ).toBeInTheDocument();
  expect(screen.getByText("@anarojas")).toBeInTheDocument();
  expect(screen.getByText("AM")).toBeInTheDocument();
  expect(
    screen.getAllByText("Reservas").length
  ).toBeGreaterThan(0);
  expect(
    screen.getByText("Operaciones")
  ).toBeInTheDocument();
  expect(screen.getByText("Guía")).toBeInTheDocument();
});

it("says there are no marks when the person has none", () => {
  render(
    <ProfileIdentityCard
      identity={{ ...PROFILE_IDENTITY, marks: [] }}
    />
  );

  expect(
    screen.getByText(PROFILE_IDENTITY_COPY.NO_MARKS)
  ).toBeInTheDocument();
});
