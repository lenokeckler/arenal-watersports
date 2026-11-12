export const CUSTOM_COMBO_PRICE_SERVICE_TEST = {
  SUCCESS_STATUS: 200,
  SERVER_ERROR_STATUS: 500,
  PRICING_ROW: {
    list_amount_crc: 18000,
    list_amount_usd: 36,
  },
  RPC_ERROR: {
    code: "P0001",
    details: null,
    hint: null,
    message: "pricing query failed",
  },
} as const;
