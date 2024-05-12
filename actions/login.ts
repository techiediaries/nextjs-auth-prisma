"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

export const login = async (values: any) => {

    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return {
            error: "Invalid fields!"
        };
    }

    const { email, password } = validatedFields.data;
    try {
        await signIn("credentials", {email, password, redirectTo:'/dashboard'});
    } catch(error){
        if(error instanceof AuthError ){
            switch(error.type){
                case "CredentialsSignin":
                    return {
                        error: "Invalid credentials!"
                    };
                default:
                    return {
                        error: "Something went wrong!"
                    } 

            }
        }

        throw error;
    }
    

}