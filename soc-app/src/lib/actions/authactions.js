"use server";

import { signIn } from "../auth";

export const login = async (providers) => {
    await signIn(providers, { redirectTo: "/home" });
};