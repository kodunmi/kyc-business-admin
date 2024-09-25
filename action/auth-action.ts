"use server";
import { registerUser } from "@/config/user.config";
import { type User } from "@/types/user";
import { revalidatePath } from "next/cache";

export const addUser = async (data: User) => {
  const response = await registerUser(data);
  return response;
};
