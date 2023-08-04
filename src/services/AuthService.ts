import { db } from "../db";

export const AuthService = {
  signUp: (email: string, password: string, name: string) => {
    const response = db.auth.signUp({
      email,
      password,
      options: { data: { name: name } },
    });
    return response;
  },

  login: (email: string, password: string) => {
    const response = db.auth.signInWithPassword({
      email,
      password,
    });

    return response;
  },

  logout: () => {
    const response = db.auth.signOut();
    return response;
  },

  getSession: () => {
    const response = db.auth.getSession();
    return response;
  },
};
