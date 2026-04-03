// tagsupdate.js
// Recursively walks content/ and rewrites tags in every .md file.
// Tag format:
//   section/KidsCollab/Fiction   (from folder path)
//   author/NathanW               (from filename OR existing tags)

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, "content");

// Try to extract author slug from filename like "Nathan-W---Title.md"
// Returns array (single item) or empty array
function extractAuthorsFromFilename(filename) {
  const match = filename.match(/^([A-Z][a-z]+)-([A-Z])---/);
  if (!match) return [];
  return [`${match[1]}${match[2]}`];
}

// Extract all author slugs from existing yaml tags.
// Handles both old bare format ("- NathanW") and new ("- author/NathanW")
function extractAuthorsFromYaml(yaml) {
  const authors = [];

  // "  - author/NathanW"
  for (const m of yaml.matchAll(/^\s*-\s*author\/([A-Z][a-zA-Z]+)\s*$/gm)) {
    authors.push(m[1]);
  }
  if (authors.length) return authors;

  // bare slug: "  - NathanW" (CamelCase with capital mid-word = author slug)
  for (const m of yaml.matchAll(/^\s*-\s*([A-Z][a-z]+[A-Z][a-zA-Z]*)\s*$/gm)) {
    authors.push(m[1]);
  }
  return authors;
}

// Build section tag from the folder path relative to content/
function buildSectionTag(relDir) {
  const parts = relDir.split(path.sep).filter(Boolean);
  return `section/${parts.join("/")}`;
}

// Parse frontmatter block from file content
function parseFrontmatter(content) {
  if (!content.startsWith("---")) return null;
  const end = content.indexOf("---", 3);
  if (end === -1) return null;
  return {
    yaml: content.slice(3, end),
    after: content.slice(end + 3),
  };
}

// Rebuild frontmatter with updated tags, preserving all other fields
function rebuildFrontmatter(yaml, newTags) {
  let cleaned = yaml;
  cleaned = cleaned.replace(/^tags:.*$/m, "");
  cleaned = cleaned.replace(/^[ \t]*-[ \t]+\S.*$/gm, "");
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n").trim();

  const tagLines = newTags.map(t => `  - ${t}`).join("\n");
  return `---\n${cleaned}\ntags:\n${tagLines}\n---`;
}

// Walk directory recursively
async function* walkMd(dir, relDir = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const rel = path.join(relDir, entry.name);
    if (entry.isDirectory()) {
      yield* walkMd(fullPath, rel);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      yield { fullPath, relDir, filename: entry.name };
    }
  }
}

async function updateTags() {
  let updated = 0;
  let skipped = 0;

  for await (const { fullPath, relDir, filename } of walkMd(contentDir)) {
    const raw = await fs.readFile(fullPath, "utf-8");
    const parsed = parseFrontmatter(raw);

    if (!parsed) {
      console.warn(`⚠  No frontmatter: ${path.join(relDir, filename)}`);
      skipped++;
      continue;
    }

    const { yaml, after } = parsed;

    const tags = [];

    const sectionTag = buildSectionTag(relDir);
    if (sectionTag !== "section/") tags.push(sectionTag);

    // Try filename first, fall back to existing yaml tags (supports multiple authors)
    const authors = extractAuthorsFromFilename(filename).length
      ? extractAuthorsFromFilename(filename)
      : extractAuthorsFromYaml(yaml);

    for (const author of authors) {
      tags.push(`author/${author}`);
    }

    const newContent = rebuildFrontmatter(yaml, tags) + after;

    if (newContent !== raw) {
      await fs.writeFile(fullPath, newContent, "utf-8");
      console.log(`✓  ${path.join(relDir, filename)} → [${tags.join(", ")}]`);
      updated++;
    } else {
      skipped++;
    }
  }

  console.log(`\nDone. ${updated} updated, ${skipped} unchanged/skipped.`);
}

updateTags();
