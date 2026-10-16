// Single source of truth for brand info and navigation.
// Navbar and Footer both import from here, so a rename happens in one place.
export const siteConfig = {
  name: "FolioPro",
  tagline: "Your professional story. All in one place.",
  signupHref: "/signup",
};

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Example", href: "#example" },
  { label: "For professionals", href: "#professionals" },
  { label: "Why FolioPro", href: "#why" },
];