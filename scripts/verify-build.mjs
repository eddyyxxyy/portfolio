import { Buffer } from "node:buffer";
import { access, readFile, readdir, stat } from "node:fs/promises";
import process from "node:process";
import { URL } from "node:url";

const dist = new URL("../dist/", import.meta.url);
const pages = [
  { file: "index.html", lang: "en" },
  { file: "pt-br/index.html", lang: "pt-BR" },
  { file: "404.html", noindex: true },
];
const failures = [];

const assert = (condition, message) => {
  if (!condition) {
    failures.push(message);
  }
};

for (const page of pages) {
  const path = new URL(page.file, dist);

  try {
    const html = await readFile(path, "utf8");
    const schemas = [];
    assert(
      Buffer.byteLength(html) <= 150 * 1024,
      `${page.file}: HTML exceeds 150 KiB`,
    );

    if (page.lang) {
      assert(
        html.includes(`<html lang="${page.lang}"`),
        `${page.file}: expected lang="${page.lang}"`,
      );
      assert(
        /<link rel="canonical" href="https:\/\/www\.edsonpimenta\.net\//u
          .test(html),
        `${page.file}: missing production canonical URL`,
      );
      assert(
        html.includes("property=\"og:image:width\" content=\"1200\"") &&
          html.includes("property=\"og:image:height\" content=\"630\"") &&
          html.includes(
            "name=\"twitter:card\" content=\"summary_large_image\"",
          ),
        `${page.file}: invalid social image metadata`,
      );
      assert(
        (html.match(/<h1(?:\s|>)/gu) ?? []).length === 1,
        `${page.file}: expected exactly one h1`,
      );
      assert(
        html.includes("<main id=\"main-content\"") &&
          html.includes("href=\"#about\"") &&
          html.includes("href=\"#career\"") &&
          html.includes("href=\"#projects\""),
        `${page.file}: missing semantic main or stable fragment links`,
      );
    }

    if (page.noindex) {
      assert(
        html.includes("<meta name=\"robots\" content=\"noindex, follow\">"),
        `${page.file}: missing noindex directive`,
      );
      assert(
        html.includes(
          "name=\"description\" content=\"The page you're trying to access doesn't exist.\"",
        ) &&
          html.includes(
            "alt=\"Illustration of a computer showing a 404 error.\"",
          ),
        `${page.file}: 404 copy or image alternative text is wrong`,
      );
    }

    assert(
      html.includes("http-equiv=\"content-security-policy\""),
      `${page.file}: missing Astro-generated CSP`,
    );
    assert(
      !/(?:googletagmanager|google-analytics|astro:transitions)/u.test(html),
      `${page.file}: contains removed analytics or transition code`,
    );

    const ids = [...html.matchAll(/\sid="([^"]+)"/gu)].map((match) => match[1]);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    assert(
      duplicateIds.length === 0,
      `${page.file}: duplicate ids: ${[...new Set(duplicateIds)].join(", ")}`,
    );

    for (const match of html.matchAll(
      /<script type="application\/ld\+json">(.*?)<\/script>/gsu,
    )) {
      try {
        schemas.push(JSON.parse(match[1]));
      } catch {
        failures.push(`${page.file}: invalid JSON-LD`);
      }
    }

    if (page.lang) {
      const graph = schemas.find((schema) => Array.isArray(schema["@graph"]));
      const entities = graph?.["@graph"] ?? [];
      const schematicLd = entities.find(
        (entity) => entity["@type"] === "SoftwareSourceCode",
      );
      const person = entities.find((entity) => entity["@type"] === "Person");
      const portrait = entities.find((entity) => entity["@id"]?.endsWith("#portrait"));
      const profile = entities.find((entity) => entity["@type"] === "ProfilePage");
      const referencedIds = entities.flatMap((entity) =>
        JSON.stringify(entity).match(/"@id":"[^"]+"/gu) ?? [],
      );
      assert(Boolean(graph), `${page.file}: missing JSON-LD knowledge graph`);
      assert(
        person?.alternateName === "eddyyxxyy" &&
          person?.email === "mailto:dev.edsonpimenta@gmail.com" &&
          person?.image?.["@id"]?.endsWith("#portrait") &&
          [
            "https://github.com/eddyyxxyy",
            "https://www.linkedin.com/in/edsonrobertopimenta/",
            "https://www.youtube.com/@eddyxide",
          ].every((profileUrl) => person?.sameAs?.includes(profileUrl)),
        `${page.file}: incomplete person entity`,
      );
      assert(
        portrait?.contentUrl === "https://www.edsonpimenta.net/edson-pimenta.webp" &&
          portrait?.width === 600 &&
          portrait?.height === 800,
        `${page.file}: portrait is not the stable public photo`,
      );
      assert(
        /^\d{4}-\d{2}-\d{2}$/u.test(profile?.dateModified ?? ""),
        `${page.file}: profile page is missing dateModified`,
      );
      assert(
        referencedIds.every((reference) =>
          entities.some(
            (entity) => reference === `"@id":"${entity["@id"]}"`,
          ),
        ),
        `${page.file}: JSON-LD contains a dangling @id`,
      );
      assert(
        schematicLd?.author?.["@id"]?.endsWith("/#person") &&
          schematicLd?.copyrightHolder?.["@id"] ===
            "https://www.grancursosonline.com.br/#organization" &&
          !("codeRepository" in (schematicLd ?? {})),
        `${page.file}: invalid SchematicLD authorship or ownership`,
      );
    } else if (page.noindex) {
      assert(
        schemas.length === 0,
        `${page.file}: noindex page must not publish a profile graph`,
      );
    }
  } catch {
    failures.push(`${page.file}: file was not generated`);
  }
}

for (const file of [
  "llms.txt",
  "sitemap-index.xml",
  "robots.txt",
  "edson-pimenta.webp",
]) {
  try {
    await access(new URL(file, dist));
  } catch {
    failures.push(`${file}: file was not generated`);
  }
}

try {
  const sitemap = await readFile(new URL("sitemap-0.xml", dist), "utf8");
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gu)];
  assert(locations.length === 2, "sitemap must contain exactly two pages");
  assert(!sitemap.includes("404"), "sitemap must exclude the 404 page");
  assert(
    sitemap.includes("hreflang=\"en-US\"") &&
      sitemap.includes("hreflang=\"pt-BR\""),
    "sitemap must contain reciprocal locale alternates",
  );
} catch {
  failures.push("sitemap-0.xml: file was not generated");
}

const robots = await readFile(new URL("robots.txt", dist), "utf8");
assert(
  robots.includes(
    "Sitemap: https://www.edsonpimenta.net/sitemap-index.xml",
  ),
  "robots.txt: missing production sitemap",
);

const llms = await readFile(new URL("llms.txt", dist), "utf8");
assert(
  llms.includes("Gran owns the project") &&
    llms.includes("authoritative sources"),
  "llms.txt: missing private ownership or authority disclaimer",
);

try {
  await access(new URL("pt-br/404/index.html", dist));
  failures.push("pt-br/404/index.html: duplicate localized 404 was generated");
} catch {
  // The single root 404 page is the expected static-host fallback.
}

const publicFiles = await readdir(new URL("../public/", import.meta.url), {
  recursive: true,
});
const distFiles = await readdir(dist, { recursive: true });
const javaScriptBundles = distFiles.filter((file) => file.endsWith(".js"));
assert(
  javaScriptBundles.length === 0,
  `JavaScript bundles found: ${javaScriptBundles.join(", ")}`,
);
const assetSizes = new Map();
for (const file of distFiles) {
  const fileStat = await stat(new URL(file, dist));
  if (fileStat.isFile()) assetSizes.set(file, fileStat.size);
}
const totalSize = (files) =>
  files.reduce((total, file) => total + (assetSizes.get(file) ?? 0), 0);
const cssFiles = distFiles.filter((file) => file.endsWith(".css"));
const fontFiles = distFiles.filter((file) => file.endsWith(".woff2"));
const optimizedImages = distFiles.filter(
  (file) =>
    file.startsWith("_astro/") &&
    /\.(?:avif|jpe?g|png|webp)$/u.test(file),
);
assert(totalSize(cssFiles) <= 64 * 1024, "generated CSS exceeds 64 KiB");
assert(
  fontFiles.length <= 7 && totalSize(fontFiles) <= 256 * 1024,
  "font output exceeds seven files or 256 KiB",
);
for (const image of optimizedImages) {
  assert(
    (assetSizes.get(image) ?? 0) <= 40 * 1024,
    `${image}: optimized image exceeds 40 KiB`,
  );
}
const downloadableResumes = [...publicFiles, ...distFiles].filter((file) =>
  /(?:resume|curriculo).*\.pdf$/iu.test(file),
);
assert(
  downloadableResumes.length === 0,
  `downloadable resumes found: ${downloadableResumes.join(", ")}`,
);

if (failures.length > 0) {
  process.stderr.write(
    `${failures.map((failure) => `- ${failure}`).join("\n")}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write("Static build verification passed.\n");
}
