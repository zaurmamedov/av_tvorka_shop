import { supabase } from "../lib/supabase";

export const authService = {
async signUp(
  email: string,
  password: string,
  fullName: string,
  phone: string,
) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
      },
    },
  });
},

  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signOut() {
    return supabase.auth.signOut();
  },
};