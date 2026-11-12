import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const setAuthUserPassword = async (
  userId: string,
  password: string
): Promise<void> => {
  const { error } =
    await createServiceRoleClient().auth.admin.updateUserById(
      userId,
      { password }
    );

  if (error) {
    failE2eOperation(
      "set the auth user password",
      error.message
    );
  }
};
