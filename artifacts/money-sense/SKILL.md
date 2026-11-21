# Money Sense visual and trust rules

## Source authority
This is a newly authored system, not an extraction of an existing component
library. The user's Money Sense brief and supplied logo define the identity.
The Daily Star, CRED, NerdWallet and Credit Karma are research references, not
templates to copy. See docs/references/research.md.

## Rules from the project brief
- Black and white dominate; green and suitable supporting colours act as accents.
- Preserve the supplied logo. Do not invent a replacement identity.
- Professional, authentic, safe and clutter-free; balance technology and mass
  accessibility rather than designing an exclusive club.
- Mobile-first. Make discovery and the next action immediately understandable.
- Homepage hierarchy: hero → discovery → sponsored placement → offers →
  Card Finder → comparison → needs-based discovery → editorial and trust.
- Use fictional product information until structured bank data and verified
  offers are available. Mark demonstrations clearly.
- Sponsored visibility must not change suitability, matching, scores,
  comparison results or independent editorial guidance.
- Show commercial labels where the placement appears, not only in a footer.

## Authored implementation decisions
- Primary: near-black for decisive actions. Secondary: pale green-neutral
  surfaces. Accent: the logo-sampled Money Sense green (`#19906d`) for focused
  actions and selected states.
- Accent tones: signature `#19906d`; deep interaction tone `#117255`; quiet
  surface `#e8f1ec`; barely tinted canvas `#f5fbf8`.
- Use one signature green hue, with lighter/darker tints for states and
  backgrounds; do not create competing brand accents. Keep warning, success,
  error and chart series distinct because they carry separate meaning.
- Prefer green surfaces with a dark-green foreground in the primary light/dark
  tokens; avoid white text on the exact logo green because it misses AA contrast.
- For ambient moments, a subtle ink-to-brand-green gradient is allowed, but
  product information, fees and sponsored labels stay on solid, high-contrast
  surfaces.
- A 4px rhythm and 12px base radius support usable, restrained controls.
- Use meaningful hover, selected, empty and focus states, not decorative motion
  that blocks discovery. Respect reduced-motion preferences.
- Minimum 44px targets in final mobile compositions; body text at least 16px.
- Do not use green alone to mean verified or suitable. Include explicit text.
- White plate for the original logo in dark mode; never invert its colours.
- Instrument Serif is a temporary open-source display substitute, not Denton.
  DM Sans is UI/body; Geist Mono is for compact financial data.
- Supplied Denton Test files are not redistributed here as production fonts.
  Licensed Denton Condensed files and confirmation of web embedding rights are
  required before replacing the display token. Do not imply licensing is verified.

Consumers must read docs/AGENTS.md and the relevant consumption guide.
