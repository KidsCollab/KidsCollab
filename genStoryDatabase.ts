import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface Story {
  title: string
  path: string
  category: string
  tags: string[]
  type: string
  collection?: string
}

const CONTENT_DIR = path.join(__dirname, "content", "KidsCollab")
const OUTPUT_FILE = path.join(CONTENT_DIR, "Story Database.md")

// Map categories to emojis
const categoryEmojis = {
  Fiction: "📖",
  Poetry: "🎭",
  "Non-Fiction": "📝",
  Persuasive: "✍️",
  Diaries: "📔",
  Speeches: "🗣️",
  "Science Fiction": "🎨",
  "Video Game Reviews": "🎮",
  Reports: "📋",
  "Write 4 Fun": "✨",
}

// Define story properties (add custom tags/types as needed)
const storyMetadata: { [key: string]: { tags: string[]; type: string; name: string } } = {
  // Add entries like this if needed:
  // "Fiction/A Hole in the Fence.md": { tags: ["tag1", "tag2"], type: "Short Story", name: "A Hole in the Fence" },
}

function scanStories(dir: string, category: string = "", collection: string = ""): Story[] {
  const stories: Story[] = []
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory() && file !== "node_modules") {
      // Recursively scan subdirectories
      const newCollection = collection ? `${collection}/${file}` : file
      stories.push(...scanStories(fullPath, category, newCollection))
    } else if (file.endsWith(".md") && file !== "index.md") {
      const relPath = path.relative(CONTENT_DIR, fullPath).replace(/\\/g, "/")
      const metaKey = relPath

      let metadata = storyMetadata[metaKey]
      if (!metadata) {
        // Generate default metadata if not defined
        metadata = {
          name: file.replace(".md", ""),
          tags: [collection ? "#" + collection.split("/")[0].toLowerCase() : "#uncategorized"],
          type: "Story",
        }
      }

      stories.push({
        title: metadata.name,
        path: relPath,
        category: category || "Other",
        tags: metadata.tags,
        type: metadata.type,
        collection: collection || undefined,
      })
    }
  }

  return stories
}

function generateDatabase() {
  console.log("🔄 Generating Story Database...")

  const categories = [
    "Fiction",
    "Poetry",
    "Non-Fiction",
    "Persuasive",
    "Diaries",
    "Speeches",
    "Science Fiction",
    "Video Game Reviews",
    "Reports",
    "Write 4 Fun",
  ]

  const allStories: { [key: string]: Story[] } = {}
  let totalStories = 0

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category)
    if (fs.existsSync(categoryPath)) {
      const stories = scanStories(categoryPath, category)
      allStories[category] = stories
      totalStories += stories.length
    }
  }

  // Get all unique tags
  const allTags = new Set<string>()
  for (const categoryStories of Object.values(allStories)) {
    for (const story of categoryStories) {
      story.tags.forEach((tag) => allTags.add(tag))
    }
  }

  // Generate markdown
  let markdown = `---
title: Story Database
description: A comprehensive index of all stories organized by category
---

# 📚 Story Database

Complete collection of all stories organized by category.

## 📊 Statistics

- **Total Stories:** ${totalStories} files
- **Categories:** ${categories.filter((c) => allStories[c]?.length > 0).length}

---

`

  // Generate content by category
  for (const category of categories) {
    if (!allStories[category] || allStories[category].length === 0) continue

    const emoji = categoryEmojis[category] || "📄"
    markdown += `## ${emoji} ${category}\n\n`
    markdown += `\`\`\`meta\ncategory: ${category}\ntotal: ${allStories[category].length}\n\`\`\`\n\n`
    markdown += `| Story | Tags | Type |\n|-------|------|------|\n`

    const stories = allStories[category].sort((a, b) => a.title.localeCompare(b.title))
    for (const story of stories) {
      const tagsStr = story.tags.join(" ")
      const encodedPath = `KidsCollab/${story.path}`.replace(/ /g, "%20")
      markdown += `| [${story.title}](${encodedPath}) | ${tagsStr} | ${story.type} |\n`
    }

    markdown += `\n`
  }

  markdown += `\n---\n\n`
  markdown += `**Auto-generated:** ${new Date().toLocaleString()}\n`

  fs.writeFileSync(OUTPUT_FILE, markdown)
  console.log(`✅ Story Database generated with ${totalStories} stories!`)
  console.log(`📁 Output: ${OUTPUT_FILE}`)
}

generateDatabase()
