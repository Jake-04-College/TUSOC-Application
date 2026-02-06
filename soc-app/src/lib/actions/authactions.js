"use server";

import { signIn, signOut } from "../auth";

export const login = async (providers) => {
    await signIn(providers, { redirectTo: "/testlogin" });
};

export const logout = async () => {
    await signOut({ redirectTo: "/testlogin" });
};