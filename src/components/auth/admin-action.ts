"use server";

import { currentRole } from "@/components/auth/auth";
import { UserRole } from "@/generated/prisma/browser";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" }
};
