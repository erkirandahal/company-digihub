/**
 * Generates an 11-step Tailwind-style color ramp (50..950) from a single hex
 * color, then applies it as the site's live `--color-indigo-*` CSS custom
 * properties. Since every `bg-indigo-*`/`text-indigo-*` utility class
 * compiles to `var(--color-indigo-N)`, overriding these on :root repaints
 * the whole site instantly — no rebuild needed.
 *
 * The 600 step is pinned to the exact input hex. The other steps are
 * derived at the same hue/saturation, with lightness interpolated between
 * the input's OWN actual lightness (at 600) and fixed near-white/near-black
 * anchors (at 50 and 950) — never fixed absolute percentages. Anchoring to
 * the input's actual lightness (rather than assuming it sits near 44%, as
 * the original hand-built #17ADC8 ramp happened to) keeps the ramp
 * monotonically light-to-dark for any color the admin picks; a fixed-percent
 * scheme breaks that ordering whenever the input's natural lightness
 * diverges from the assumed value.
 */

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const LIGHT_ANCHOR = 97; // target lightness % at step 50
const DARK_ANCHOR = 12; // target lightness % at step 950

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const int = parseInt(hex.slice(1), 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;
  const max = Math.max(rs, gs, bs);
  const min = Math.min(rs, gs, bs);
  const l = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) {
    return { h: 0, s: 0, l };
  }

  const s = delta / (1 - Math.abs(2 * l - 1));
  let h: number;
  switch (max) {
    case rs:
      h = ((gs - bs) / delta) % 6;
      break;
    case gs:
      h = (bs - rs) / delta + 2;
      break;
    default:
      h = (rs - gs) / delta + 4;
  }
  h *= 60;
  if (h < 0) h += 360;

  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let rs = 0;
  let gs = 0;
  let bs = 0;
  if (h < 60) [rs, gs, bs] = [c, x, 0];
  else if (h < 120) [rs, gs, bs] = [x, c, 0];
  else if (h < 180) [rs, gs, bs] = [0, c, x];
  else if (h < 240) [rs, gs, bs] = [0, x, c];
  else if (h < 300) [rs, gs, bs] = [x, 0, c];
  else [rs, gs, bs] = [c, 0, x];

  return { r: (rs + m) * 255, g: (gs + m) * 255, b: (bs + m) * 255 };
}

export function generateColorRamp(hex: string): Record<(typeof STEPS)[number], string> {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const l600 = l * 100;

  const ramp = {} as Record<(typeof STEPS)[number], string>;
  STEPS.forEach((step, i) => {
    if (step === 600) {
      ramp[step] = hex.toLowerCase();
      return;
    }
    // i=6 is the 600 step; interpolate toward LIGHT_ANCHOR for i<6 (steps 50-500)
    // and toward DARK_ANCHOR for i>6 (steps 700-950), anchored at the input's own l600.
    const targetL =
      i < 6
        ? LIGHT_ANCHOR + (l600 - LIGHT_ANCHOR) * (i / 6)
        : l600 + (DARK_ANCHOR - l600) * ((i - 6) / 4);
    const rgb = hslToRgb(h, s, targetL / 100);
    ramp[step] = rgbToHex(rgb.r, rgb.g, rgb.b);
  });
  return ramp;
}

/**
 * Applies the ramp derived from `hex` to `document.documentElement` as
 * inline `--color-indigo-*` custom properties, overriding the static
 * defaults compiled into index.css. No-op on an invalid/missing hex, which
 * leaves the CSS-defined default ramp in place.
 */
export function applyPrimaryColor(hex?: string | null): void {
  if (!hex || !HEX_PATTERN.test(hex)) return;

  const ramp = generateColorRamp(hex);
  const root = document.documentElement;
  for (const step of STEPS) {
    root.style.setProperty(`--color-indigo-${step}`, ramp[step]);
  }
}
