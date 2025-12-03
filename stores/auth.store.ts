import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SessionState {
  is_logged_in: boolean;
  has_completed_onboarding: boolean;
  complete_onboarding: () => void;
  reset_onboarding: () => void;
  log_in: () => void;
  log_out: () => void;
}

export const useSessionStore = create(
  persist<SessionState>(
    (set) => ({
      is_logged_in: false,
      has_completed_onboarding: false,

      complete_onboarding: () =>
        set(() => ({
          has_completed_onboarding: true,
        })),

      reset_onboarding: () =>
        set(() => ({
          has_completed_onboarding: false,
        })),

      log_in: () =>
        set(() => ({
          is_logged_in: true,
        })),

      log_out: () =>
        set(() => ({
          is_logged_in: false,
        })),
    }),
    {
      name: "auth-storess",
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
