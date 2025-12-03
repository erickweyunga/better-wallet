import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OnboardingStep = "welcome" | "setup_pin" | "completed";

interface OnboardingState {
  is_onboarding_started: boolean;
  has_completed_onboarding: boolean;
  current_step: OnboardingStep | null;
  completed_steps: OnboardingStep[];
  onboarding_completed_at: string | null;
}

interface SessionState extends OnboardingState {
  is_logged_in: boolean;

  start_onboarding: () => void;
  set_onboarding_step: (step: OnboardingStep) => void;
  complete_onboarding_step: (step: OnboardingStep) => void;
  complete_onboarding: () => void;
  reset_onboarding: () => void;
  skip_onboarding: () => void;

  log_in: () => void;
  log_out: () => void;

  is_step_completed: (step: OnboardingStep) => boolean;
}

export const useSessionStore = create(
  persist<SessionState>(
    (set, get) => ({
      is_logged_in: false,
      is_onboarding_started: false,
      has_completed_onboarding: false,
      current_step: null,
      completed_steps: [],
      onboarding_completed_at: null,

      start_onboarding: () =>
        set(() => ({
          is_onboarding_started: true,
          current_step: "welcome",
        })),

      set_onboarding_step: (step) =>
        set(() => ({
          current_step: step,
        })),

      complete_onboarding_step: (step) =>
        set((state) => ({
          completed_steps: state.completed_steps.includes(step)
            ? state.completed_steps
            : [...state.completed_steps, step],
        })),

      complete_onboarding: () =>
        set(() => ({
          has_completed_onboarding: true,
          is_onboarding_started: false,
          current_step: "completed",
          onboarding_completed_at: new Date().toISOString(),
        })),

      reset_onboarding: () =>
        set(() => ({
          is_onboarding_started: false,
          has_completed_onboarding: false,
          current_step: null,
          completed_steps: [],
          onboarding_completed_at: null,
        })),

      skip_onboarding: () =>
        set(() => ({
          has_completed_onboarding: true,
          is_onboarding_started: false,
          current_step: null,
          onboarding_completed_at: new Date().toISOString(),
        })),

      log_in: () =>
        set(() => ({
          is_logged_in: true,
        })),

      log_out: () =>
        set(() => ({
          is_logged_in: false,
        })),

      is_step_completed: (step) => {
        return get().completed_steps.includes(step);
      },
    }),
    {
      name: "auth-storages",
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
