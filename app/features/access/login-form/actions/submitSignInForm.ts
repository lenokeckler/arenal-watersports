"use server";

import type { SignInError } from "@/app/services/authentication";
import type { NullableRef } from "@/app/types";
import { readSignInCredentials } from "../utils/readSignInCredentials";
import { submitSignIn } from "./submitSignIn";

export const submitSignInForm = async (
  _previousError: NullableRef<SignInError>,
  formData: FormData
): Promise<NullableRef<SignInError>> =>
  await submitSignIn(readSignInCredentials(formData));
