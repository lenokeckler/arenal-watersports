import { NextResponse } from "next/server";
import { HTTP_STATUS } from "@/app/constants";
import type { ResponseInit } from "./models/ResponseInit.interface";
import type { SuccessResponse } from "./models/SuccessResponse.interface";
import type { ErrorResponse } from "./models/ErrorResponse.interface";

type ErrorOptions = {
  status?: number;
  field?: string;
  details?: Record<string, unknown>;
};

const json = <T = Record<string, unknown>>(
  data: T,
  init?: ResponseInit
): NextResponse<T> => NextResponse.json(data, init);

const successBase = <T = Record<string, unknown>>(
  data?: T,
  message?: string,
  status: number = HTTP_STATUS.OK
): NextResponse<SuccessResponse<T>> =>
  NextResponse.json(
    {
      success: true,
      ...(message && { message }),
      ...(data !== undefined && data),
    } as SuccessResponse<T>,
    { status }
  );

const errorBase = (
  error: string,
  {
    status = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    field,
    details,
  }: ErrorOptions = {}
): NextResponse<ErrorResponse> =>
  NextResponse.json(
    {
      success: false,
      error,
      ...(field && { field }),
      ...(details !== undefined && { details }),
    } as ErrorResponse,
    { status }
  );

const Response = {
  json,

  success: <T = Record<string, unknown>>(
    data?: T,
    message?: string
  ): NextResponse<SuccessResponse<T>> =>
    successBase<T>(data, message, HTTP_STATUS.OK),

  created: <T = Record<string, unknown>>(
    data?: T,
    message?: string
  ): NextResponse<SuccessResponse<T>> =>
    successBase<T>(data, message, HTTP_STATUS.CREATED),

  error: (
    error: string,
    status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    field?: string,
    details?: Record<string, unknown>
  ): NextResponse<ErrorResponse> =>
    errorBase(error, { status, field, details }),

  badRequest: (
    error: string,
    field?: string
  ): NextResponse<ErrorResponse> =>
    errorBase(error, {
      status: HTTP_STATUS.BAD_REQUEST,
      field,
    }),

  unauthorized: (
    error: string,
    field?: string
  ): NextResponse<ErrorResponse> =>
    errorBase(error, {
      status: HTTP_STATUS.UNAUTHORIZED,
      field,
    }),

  forbidden: (error: string): NextResponse<ErrorResponse> =>
    errorBase(error, { status: HTTP_STATUS.FORBIDDEN }),

  notFound: (error: string): NextResponse<ErrorResponse> =>
    errorBase(error, { status: HTTP_STATUS.NOT_FOUND }),

  conflict: (error: string): NextResponse<ErrorResponse> =>
    errorBase(error, { status: HTTP_STATUS.CONFLICT }),

  tooManyRequests: (
    error: string
  ): NextResponse<ErrorResponse> =>
    errorBase(error, {
      status: HTTP_STATUS.TOO_MANY_REQUESTS,
    }),

  internalError: (
    error: string,
    details?: Record<string, unknown>
  ): NextResponse<ErrorResponse> =>
    errorBase(error, {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      details,
    }),
} as const;

export default Response;
