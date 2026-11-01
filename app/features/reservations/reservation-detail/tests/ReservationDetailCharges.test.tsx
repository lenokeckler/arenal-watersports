import { describe, expect, it } from "vitest";
import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CURRENCY,
  type ReservationDetailCurrency,
} from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_CHARGES_COPY } from "../constants/ReservationDetailChargesCopy.constants";
import { formatReservationDetailAmount } from "../utils/formatReservationDetailAmount";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { RESERVATION_DETAIL_CHARGES_TEST as test } from "./ReservationDetailChargesTest.constants";
import { renderReservationDetail } from "./ReservationDetailTestRenderer";
import { createReservationDetailChargesPage } from "./ReservationDetailCharges.page";

const renderCharges = (
  source: ReservationDetailReservationSource
): HTMLElement => {
  renderReservationDetail(source);
  return createReservationDetailChargesPage().getRegion();
};

const renderChargesWithAdditionalTariff = (): HTMLElement =>
  renderCharges({
    ...RESERVATION_DETAIL_SOURCE_FIXTURE,
    reservation_charges: [
      ...RESERVATION_DETAIL_SOURCE_FIXTURE.reservation_charges,
      {
        amount: test.ADDITIONAL_CHARGE_CRC,
        currency: RESERVATION_DETAIL_CURRENCY.CRC,
        kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
      },
    ],
  });

const renderChargesWithExtraTimeAndRefunds =
  (): HTMLElement =>
    renderCharges({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      refunds: [
        {
          amount: test.REFUND_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
        },
        {
          amount: test.SECOND_REFUND_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
        },
      ],
      reservation_charges: [
        ...RESERVATION_DETAIL_SOURCE_FIXTURE.reservation_charges,
        {
          amount: test.EXTRA_TIME_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
          kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
        },
        {
          amount: test.SECOND_EXTRA_TIME_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
          kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
        },
      ],
    });

const formatExpectedAmount = (
  amount: number,
  currency: ReservationDetailCurrency
): string =>
  formatReservationDetailAmount(amount, currency).replace(
    /\s/gu,
    " "
  );

describe("reservation detail charge totals", (): void => {
  it("shows status and aggregates totals by currency", (): void => {
    const charges = renderChargesWithAdditionalTariff();

    expect(charges).toHaveTextContent(test.CHARGE_STATUS);
    expect(charges).toHaveTextContent(test.USD_SYMBOL);
    expect(charges).toHaveTextContent(test.CRC_SYMBOL);
    expect(charges).toHaveTextContent(
      formatExpectedAmount(
        test.CHARGE_USD,
        RESERVATION_DETAIL_CURRENCY.USD
      )
    );
    expect(charges).toHaveTextContent(
      formatExpectedAmount(
        test.CHARGE_CRC + test.ADDITIONAL_CHARGE_CRC,
        RESERVATION_DETAIL_CURRENCY.CRC
      )
    );
  });

  it("distinguishes an undefined tariff from an unpriced reservation", (): void => {
    const charges = renderCharges({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      reservation_pricing: null,
    });

    expect(charges).toHaveTextContent(
      RESERVATION_DETAIL_CHARGES_COPY.MISSING_AMOUNT
    );
    expect(charges).toHaveTextContent(
      RESERVATION_DETAIL_CHARGES_COPY.UNPRICED
    );
  });

  it("shows gross, net, refunded, and customer credit amounts", (): void => {
    const source = {
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      refunds: [
        {
          amount: test.REFUND_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
        },
      ],
      reservation_pricing: {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE.reservation_pricing,
        agreed_amount_crc: test.CHARGE_CRC / 2,
      },
    };
    const charges = renderCharges(source);

    expect(charges).toHaveTextContent(
      RESERVATION_DETAIL_CHARGES_COPY.AMOUNT_CHARGED_GROSS
    );
    expect(charges).toHaveTextContent(
      RESERVATION_DETAIL_CHARGES_COPY.AMOUNT_CHARGED_NET
    );
    expect(charges).toHaveTextContent(
      RESERVATION_DETAIL_CHARGES_COPY.AMOUNT_CREDIT
    );
    expect(charges).toHaveTextContent(
      RESERVATION_DETAIL_CHARGES_COPY.REFUNDS
    );
    expect(charges).toHaveTextContent(
      formatExpectedAmount(
        test.CHARGE_CRC,
        RESERVATION_DETAIL_CURRENCY.CRC
      )
    );
    expect(charges).toHaveTextContent(
      formatExpectedAmount(
        test.CHARGE_CRC - test.REFUND_CRC,
        RESERVATION_DETAIL_CURRENCY.CRC
      )
    );
    expect(charges).toHaveTextContent(
      formatExpectedAmount(
        test.CHARGE_CRC -
          test.REFUND_CRC -
          test.CHARGE_CRC / 2,
        RESERVATION_DETAIL_CURRENCY.CRC
      )
    );
    expect(charges).toHaveTextContent(
      formatExpectedAmount(
        test.REFUND_CRC,
        RESERVATION_DETAIL_CURRENCY.CRC
      )
    );
  });
});

describe("reservation detail supplemental amounts", (): void => {
  it("shows extra-time charges separately", (): void => {
    const charges = renderChargesWithExtraTimeAndRefunds();

    expect(charges).toHaveTextContent(
      RESERVATION_DETAIL_CHARGES_COPY.EXTRA_TIME_CHARGES
    );
    expect(charges).toHaveTextContent(
      formatExpectedAmount(
        test.EXTRA_TIME_CRC + test.SECOND_EXTRA_TIME_CRC,
        RESERVATION_DETAIL_CURRENCY.CRC
      )
    );
  });

  it("shows refunds separately", (): void => {
    const charges = renderChargesWithExtraTimeAndRefunds();

    expect(charges).toHaveTextContent(
      RESERVATION_DETAIL_CHARGES_COPY.REFUNDS
    );
    expect(charges).toHaveTextContent(
      formatExpectedAmount(
        test.REFUND_CRC + test.SECOND_REFUND_CRC,
        RESERVATION_DETAIL_CURRENCY.CRC
      )
    );
  });
});
