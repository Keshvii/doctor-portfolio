import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";
const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const sections = ["about", "education", "inquiry"];
const routes = [
  "/",
  ...sections.map((s) => `/${s}/`),
  ...["1", "2", "3"].flatMap((d) => [
    `/demo/${d}/`,
    ...sections.map((s) => `/demo/${d}/${s}/`),
  ]),
];
for (const route of routes) {
  const file = join("out", route, "index.html");
  assert(existsSync(file), `Missing export route ${route}`);
  const html = readFileSync(file, "utf8");
  assert(/noindex/.test(html), `Missing noindex metadata ${route}`);
  assert(html.includes("Dr. Siraj Ahmad"), `Missing updated identity ${route}`);
  assert(
    !/Ananya Mehra|Stanford|fictional portfolio/i.test(html),
    `Outdated profile in ${route}`,
  );
  if (!route.endsWith("/education/") && !route.endsWith("/inquiry/"))
    assert(
      html.includes(`src="${base}/images/doctor/dr-siraj-ahmad.png"`),
      `Missing supplied portrait ${route}`,
    );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `Expected one primary heading in ${route}`,
  );
  for (const [, url] of html.matchAll(
    /(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g,
  )) {
    if (!url.startsWith("/")) continue;
    assert(!base || url.startsWith(base + "/"), `Missing base path: ${url}`);
    const local = decodeURIComponent(url.slice(base.length));
    const target = local.endsWith("/")
      ? join("out", local, "index.html")
      : join("out", local);
    assert(existsSync(target), `Broken local route or asset ${url}`);
  }
  assert(
    !html.includes("rahul@example.com"),
    "Sample inquiry details leaked into output",
  );
  if (route.endsWith("/education/")) {
    assert(
      !html.includes("library-query") && !html.includes('type="search"'),
      `Unexpected playlist search bar ${route}`,
    );
    assert(
      html.includes("pharmacology-revision-demo.pdf"),
      `Missing PDF download ${route}`,
    );
    assert(
      html.includes("pwmeded"),
      `Missing collaborated Telegram channel ${route}`,
    );
    for (const id of [
      "PL5ILp8AXdIVq-QSVuY4HMue_BxyaGlDEM",
      "PL5ILp8AXdIVoW7fXePer4-009LqTNaxf8",
      "PL5ILp8AXdIVoEiW-4TBLoVtF7RLSJ5DOD",
    ])
      assert(html.includes(id), `Missing requested collection ${id}`);
  } else if (route.endsWith("/inquiry/")) {
    for (const field of [
      "name",
      "email",
      "purpose",
      "subject",
      "message",
      "consent",
    ])
      assert(
        html.includes(`name="${field}"`),
        `Missing inquiry field ${field} on ${route}`,
      );
  } else if (!route.endsWith("/about/")) {
    for (const id of [
      "18AtXNn8ie8",
      "1fdUj5XC6ww",
      "_URqebijMXQ",
      "rbzx3xkSx44",
      "QgquCQNqGWg",
    ])
      assert(html.includes(id), `Missing first-five episode ${id} on ${route}`);
  }
}
assert(
  readFileSync("out/downloads/pharmacology-revision-demo.pdf")
    .subarray(0, 5)
    .toString() === "%PDF-",
  "Invalid downloadable PDF",
);
assert(existsSync("out/.nojekyll") && existsSync("out/robots.txt"));
const chunks = readdirSync("out/_next/static/chunks").filter((name) =>
  name.endsWith(".js"),
);
for (const chunk of chunks)
  assert(
    !readFileSync(join("out/_next/static/chunks", chunk), "utf8").includes(
      "rahul@example.com",
    ),
    "Sample inquiry detail in a browser chunk",
  );
console.log(
  `Verified ${routes.length} exported pages, navigation and image paths (basePath=${base || "/"}), noindex and Pages marker files.`,
);
