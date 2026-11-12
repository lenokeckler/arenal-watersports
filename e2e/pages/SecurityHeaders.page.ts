import type { APIRequestContext } from "@playwright/test";

export const createSecurityHeadersPage = (
  request: APIRequestContext
) => ({
  fetchHeaders: async (
    path: string
  ): Promise<Record<string, string>> => {
    const response = await request.get(path);
    return response.headers();
  },
});
