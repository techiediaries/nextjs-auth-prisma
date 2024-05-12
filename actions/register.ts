"use server";
import prisma from "@/lib/db";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await prisma.user.findUnique({ where: { email: email } });

  if(existingUser){
    return {
        error: "Email already taken!"
    };
  }
  await prisma.user.create({
    data: {
        name,
        email,
        password: hashedPassword
    }
  });
  return {
    success: "User successfully created!"
  };
};
