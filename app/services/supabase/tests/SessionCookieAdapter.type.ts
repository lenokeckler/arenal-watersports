export type SessionCookieAdapter = {
  getAll: () => { name: string; value: string }[];
  setAll: (
    cookies: {
      name: string;
      value: string;
      options: Record<string, unknown>;
    }[]
  ) => void;
};
