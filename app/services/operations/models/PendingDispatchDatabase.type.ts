import type { Database } from "@/app/types";

type PublicSchema = Database["public"];

export type PendingDispatchDatabase = Omit<
  Database,
  "public"
> & {
  public: Omit<PublicSchema, "Functions"> & {
    Functions: PublicSchema["Functions"] & {
      pending_dispatch_reservations: {
        Args: {
          p_ends_at: string;
          p_limit?: number;
          p_offset?: number;
          p_starts_at: string;
        };
        Returns: {
          code: string;
          customer_name: string;
          id: string;
          starts_at: string;
          status: Database["public"]["Enums"]["reservation_status"];
        }[];
      };
    };
  };
};
