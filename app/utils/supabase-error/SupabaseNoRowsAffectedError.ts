export class SupabaseNoRowsAffectedError extends Error {
  constructor(operation: string) {
    super(`Supabase write changed no row: ${operation}`);
    this.name = "SupabaseNoRowsAffectedError";
  }
}

export const throwIfNoRowsAffected = (
  rows: readonly unknown[],
  operation: string
): void => {
  if (rows.length === 0) {
    throw new SupabaseNoRowsAffectedError(operation);
  }
};
