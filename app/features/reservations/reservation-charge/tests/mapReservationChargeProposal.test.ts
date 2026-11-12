import { describe, expect, it } from "vitest";
import { mapReservationChargeProposal } from "../utils/mapReservationChargeProposal";
import {
  BOTH_PROPOSAL,
  BOTH_PROPOSAL_ROW,
  EMPTY_PROPOSAL,
  EMPTY_PROPOSAL_ROW,
  MIXED_PROPOSAL,
  MIXED_PROPOSAL_ROW,
} from "./ReservationCharge.constants";

describe("mapReservationChargeProposal", () => {
  it("maps both currencies of the first row", () => {
    expect(
      mapReservationChargeProposal([BOTH_PROPOSAL_ROW])
    ).toEqual(BOTH_PROPOSAL);
  });

  it("keeps a null currency next to a priced one", () => {
    expect(
      mapReservationChargeProposal([MIXED_PROPOSAL_ROW])
    ).toEqual(MIXED_PROPOSAL);
  });

  it("keeps a row whose two currencies are null", () => {
    expect(
      mapReservationChargeProposal([EMPTY_PROPOSAL_ROW])
    ).toEqual(EMPTY_PROPOSAL);
  });

  it("returns no proposal when the function returns null", () => {
    expect(mapReservationChargeProposal(null)).toEqual(
      EMPTY_PROPOSAL
    );
  });

  it("returns no proposal when the function returns no rows", () => {
    expect(mapReservationChargeProposal([])).toEqual(
      EMPTY_PROPOSAL
    );
  });

  it("ignores rows after the first one", () => {
    expect(
      mapReservationChargeProposal([
        MIXED_PROPOSAL_ROW,
        BOTH_PROPOSAL_ROW,
      ])
    ).toEqual(MIXED_PROPOSAL);
  });

  it("keeps a zero amount instead of treating it as missing", () => {
    expect(
      mapReservationChargeProposal([
        { proposal_crc: 0, proposal_usd: 0 },
      ])
    ).toEqual({ CRC: 0, USD: 0 });
  });
});
