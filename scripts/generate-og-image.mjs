import { Buffer } from "node:buffer";
import process from "node:process";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath, URL } from "node:url";

import sharp from "sharp";

const output = fileURLToPath(
  new URL("../public/og/edson-pimenta-portfolio.png", import.meta.url),
);
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"
  viewBox="0 0 1200 630" role="img" aria-labelledby="title description">
  <title id="title">Edson Pimenta</title>
  <desc id="description">Growth Engineering and AI Systems portfolio</desc>
  <defs>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#183643"
        stroke-width="1"/>
    </pattern>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#28a3cc"/>
      <stop offset="1" stop-color="#825ddf"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#07151d"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity=".7"/>
  <rect x="72" y="72" width="12" height="486" rx="6" fill="url(#accent)"/>
  <circle cx="1034" cy="154" r="90" fill="none" stroke="#28a3cc"
    stroke-width="14"/>
  <circle cx="1090" cy="224" r="48" fill="#825ddf" opacity=".9"/>
  <text x="132" y="230" fill="#f2f9fd" font-family="Arial, sans-serif"
    font-size="84" font-weight="700" letter-spacing="2">EDSON PIMENTA</text>
  <text x="136" y="304" fill="#aec6d0" font-family="Arial, sans-serif"
    font-size="38">Growth Engineering · AI Systems</text>
  <text x="136" y="374" fill="#8cabb9" font-family="Arial, sans-serif"
    font-size="28">High-scale web architecture measured in growth,</text>
  <text x="136" y="414" fill="#8cabb9" font-family="Arial, sans-serif"
    font-size="28">indexation, performance, and maintainability.</text>
  <g font-family="Arial, sans-serif" font-size="22" font-weight="700">
    <rect x="136" y="476" width="100" height="46" rx="23" fill="#183643"/>
    <text x="161" y="506" fill="#f2f9fd">PHP</text>
    <rect x="252" y="476" width="160" height="46" rx="23" fill="#183643"/>
    <text x="275" y="506" fill="#f2f9fd">TypeScript</text>
    <rect x="428" y="476" width="130" height="46" rx="23" fill="#183643"/>
    <text x="452" y="506" fill="#f2f9fd">Node.js</text>
    <rect x="574" y="476" width="120" height="46" rx="23" fill="#183643"/>
    <text x="601" y="506" fill="#f2f9fd">Astro</text>
  </g>
  <text x="1130" y="570" text-anchor="end" fill="#6d91a1"
    font-family="Arial, sans-serif" font-size="24">edsonpimenta.net</text>
</svg>`;

await mkdir(dirname(output), { recursive: true });
await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, palette: true })
  .toFile(output);

process.stdout.write(`Generated ${output}\n`);
