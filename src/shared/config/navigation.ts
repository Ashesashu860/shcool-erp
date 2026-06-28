export type NavItem = {
  label: string;
  icon: string;
  href: string;
};

/** Primary sidebar navigation, mirrored from the ScholarSync admin designs. */
export const primaryNav: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/" },
  { label: "Classes", icon: "school", href: "/classes" },
  { label: "Teachers", icon: "person_4", href: "/teachers" },
  { label: "Students", icon: "group", href: "/students" },
  { label: "Parents", icon: "family_restroom", href: "/parents" },
  { label: "Principals", icon: "account_balance", href: "/principals" },
  { label: "Settings", icon: "settings", href: "/settings" },
];

/** Condensed navigation shown in the mobile bottom bar. */
export const mobileNav: NavItem[] = [
  { label: "Home", icon: "home", href: "/" },
  { label: "Classes", icon: "school", href: "/classes" },
  { label: "Students", icon: "group", href: "/students" },
  { label: "Settings", icon: "settings", href: "/settings" },
];
