import { create } from "zustand";

type UIState = {
  /** Mobile sidebar drawer open state. */
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
}));

export const useMobileNavOpen = () => useUIStore((s) => s.mobileNavOpen);
export const useSetMobileNavOpen = () => useUIStore((s) => s.setMobileNavOpen);
export const useToggleMobileNav = () => useUIStore((s) => s.toggleMobileNav);
