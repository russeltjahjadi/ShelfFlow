import { create } from "zustand";

export const useAuthStore = create((set) => ({
  registerUser: async (newUser) => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      return { success: false, message: "Please fill in all fields!!" };
    }

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Registration failed...",
        };
      }

      return { success: true, message: "Registered!" };
    } catch (e) {
      return { success: false, message: e.message };
    }
  },
}));
