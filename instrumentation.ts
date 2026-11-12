import type { Instrumentation } from "next";
import { reportServerError } from "@/app/services/observability";

export const onRequestError: Instrumentation.onRequestError =
  (error, _request, context) => {
    reportServerError(
      `${context.routeType}:${context.routePath}`,
      error
    );
  };
