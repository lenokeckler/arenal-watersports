import { describe, expect, it } from "vitest";
import { resolveMachineId } from "../utils/resolveMachineId";

const ID = "167885f9-536a-47e0-ba90-5e16eed7c782";
const MACHINES = [{ code: "JET-01", id: ID }];

describe("resolveMachineId", () => {
  it("accepts only a listed machine id", () => {
    expect(resolveMachineId(ID, MACHINES)).toBe(ID);
    expect(resolveMachineId(ID, [])).toBeNull();
    expect(resolveMachineId([ID], MACHINES)).toBeNull();
    expect(resolveMachineId("x", MACHINES)).toBeNull();
  });
});
