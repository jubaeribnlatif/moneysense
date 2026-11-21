/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#ffffff",
      "foreground": "#151916",
      "border": "#d6dcd7",
      "card": "#ffffff",
      "cardForeground": "#0a0a0a",
      "popover": "#ffffff",
      "popoverForeground": "#0a0a0a",
      "primary": "#171717",
      "primaryForeground": "#fafafa",
      "secondary": "#edf2ed",
      "secondaryForeground": "#171717",
      "muted": "#f5f5f5",
      "mutedForeground": "#59625b",
      "accent": "#c5e8a8",
      "accentForeground": "#17351e",
      "destructive": "#b42e35",
      "destructiveForeground": "#fafafa",
      "input": "#778379",
      "ring": "#286b3f",
      "chart1": "#286b3f",
      "chart2": "#397b88",
      "chart3": "#8c6222",
      "chart4": "#756496",
      "chart5": "#b45b48",
      "sidebar": "#fafafa",
      "sidebarForeground": "#404040",
      "sidebarBorder": "#e5e5e5",
      "sidebarPrimary": "#171717",
      "sidebarPrimaryForeground": "#fafafa",
      "sidebarAccent": "#edf2ed",
      "sidebarAccentForeground": "#171717",
      "sidebarRing": "#171717"
    },
    "dark": {
      "background": "#0a0a0a",
      "foreground": "#fafafa",
      "border": "#262626",
      "card": "#0a0a0a",
      "cardForeground": "#fafafa",
      "popover": "#0a0a0a",
      "popoverForeground": "#fafafa",
      "primary": "#fafafa",
      "primaryForeground": "#171717",
      "secondary": "#262626",
      "secondaryForeground": "#fafafa",
      "muted": "#262626",
      "mutedForeground": "#b0b9b2",
      "accent": "#c5e8a8",
      "accentForeground": "#17351e",
      "destructive": "#7f1d1d",
      "destructiveForeground": "#fafafa",
      "input": "#78877b",
      "ring": "#c5e8a8",
      "chart1": "#a5d98b",
      "chart2": "#83c4d0",
      "chart3": "#dfb86f",
      "chart4": "#bba6dc",
      "chart5": "#e8a08b",
      "sidebar": "#171717",
      "sidebarForeground": "#f5f5f5",
      "sidebarBorder": "#262626",
      "sidebarPrimary": "#c5e8a8",
      "sidebarPrimaryForeground": "#17351e",
      "sidebarAccent": "#262626",
      "sidebarAccentForeground": "#f5f5f5",
      "sidebarRing": "#d4d4d4"
    }
  },
  "fontFamily": {
    "sans": [
      "DM Sans",
      "sans-serif"
    ],
    "serif": [
      "Instrument Serif",
      "Georgia",
      "serif"
    ],
    "mono": [
      "Geist Mono",
      "monospace"
    ]
  },
  "radius": "0.75rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
