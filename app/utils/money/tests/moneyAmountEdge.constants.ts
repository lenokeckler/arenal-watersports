import { MONEY_AMOUNT_ISSUE } from "@/app/constants";
import type { MoneyAmountIssueCase } from "../models/MoneyAmountIssueCase.interface";

export const MONEY_AMOUNT_EDGE_CASES: MoneyAmountIssueCase[] =
  [
    {
      amountText: "5\n",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "\n5",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "５",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "٣",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: ".",
      expectedIssue: MONEY_AMOUNT_ISSUE.FORMAT,
    },
    {
      amountText: "0.001",
      expectedIssue: MONEY_AMOUNT_ISSUE.PRECISION,
    },
    {
      amountText: "00000000000",
      expectedIssue: MONEY_AMOUNT_ISSUE.NOT_POSITIVE,
    },
    {
      amountText: "0.0",
      expectedIssue: MONEY_AMOUNT_ISSUE.NOT_POSITIVE,
    },
    {
      amountText: "0.10",
      expectedIssue: null,
    },
  ];
