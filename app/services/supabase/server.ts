import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE } from "@/app/constants";
import type { Database } from "@/app/types";

const ignoreCookieWriteFromServerComponent = (): void =>
  undefined;

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(
              ({ name, value, options }) => {
                cookieStore.set(name, value, options);
              }
            );
          } catch {
            ignoreCookieWriteFromServerComponent();
          }
        },
      },
    }
  );
};
