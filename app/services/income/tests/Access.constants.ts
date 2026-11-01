import type { AreaRpcResult } from "./models/AreaRpcResult.interface";

export const GRANTED: AreaRpcResult = {
  data: true,
  error: null,
};

export const REFUSED: AreaRpcResult = {
  data: false,
  error: null,
};

export const UNANSWERED: AreaRpcResult = {
  data: null,
  error: null,
};

export const FAILED: AreaRpcResult = {
  data: null,
  error: {
    name: "PostgrestError",
    message: "connection refused",
    details: "",
    hint: "",
    code: "08006",
  },
};
