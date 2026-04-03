import * as fs from "fs"
import * as path from "path"

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

// Define story properties
const storyMetadata: { [key: string]: { tags: string[]; type: string; name: string } } = {
  // Fiction
  "Fiction/A Hole in the Fence.md": { tags: ["#adventure", "#drama"], type: "Short Story", name: "A Hole in the Fence" },
  "Fiction/A Monster's Identity.md": { tags: ["#creative", "#mystery"], type: "Short Story", name: "A Monster's Identity" },
  "Fiction/A New Life in New Zealand.md": {
    tags: ["#adventure", "#family"],
    type: "Short Story",
    name: "A New Life in New Zealand",
  },
  "Fiction/A Reckless Rodeo.md": { tags: ["#adventure", "#action"], type: "Short Story", name: "A Reckless Rodeo" },
  "Fiction/Beyond Swamp Bottom.md": {
    tags: ["#adventure", "#fantasy"],
    type: "Short Story",
    name: "Beyond Swamp Bottom",
  },
  "Fiction/Desperation.md": { tags: ["#drama", "#emotional"], type: "Short Story", name: "Desperation" },
  "Fiction/Different.md": { tags: ["#identity", "#personal"], type: "Short Story", name: "Different" },
  "Fiction/Grey City.md": { tags: ["#sci-fi", "#urban"], type: "Short Story", name: "Grey City" },
  "Fiction/If Looks Could Kill.md": { tags: ["#drama", "#mystery"], type: "Short Story", name: "If Looks Could Kill" },
  "Fiction/Moving Home.md": { tags: ["#personal", "#family"], type: "Short Story", name: "Moving Home" },
  "Fiction/Nay Farn.md": { tags: ["#adventure", "#fantasy"], type: "Short Story", name: "Nay Farn" },
  "Fiction/Paintball - A Drama Script.md": {
    tags: ["#drama", "#script"],
    type: "Drama Script",
    name: "Paintball - A Drama Script",
  },
  "Fiction/Rain, Town, Rescue, Battle.md": {
    tags: ["#action", "#adventure"],
    type: "Short Story",
    name: "Rain, Town, Rescue, Battle",
  },
  "Fiction/Razing.md": { tags: ["#action", "#drama"], type: "Short Story", name: "Razing" },
  "Fiction/Pinocchio Essay.md": { tags: ["#analysis", "#literature"], type: "Essay", name: "Pinocchio Essay" },
  "Fiction/The Gum Family Finds Home.md": {
    tags: ["#family", "#humor"],
    type: "Short Story",
    name: "The Gum Family Finds Home",
  },
  "Fiction/The Koopas.md": { tags: ["#family", "#creative"], type: "Short Story", name: "The Koopas" },
  "Fiction/The Missing Mascots.md": { tags: ["#mystery", "#school"], type: "Short Story", name: "The Missing Mascots" },
  "Fiction/The Mountain.md": { tags: ["#adventure", "#nature"], type: "Short Story", name: "The Mountain" },
  "Fiction/The Terror of Olympus.md": {
    tags: ["#mythology", "#action"],
    type: "Short Story",
    name: "The Terror of Olympus",
  },
  "Fiction/The Zodiac Race - A Drama Script.md": {
    tags: ["#drama", "#script"],
    type: "Drama Script",
    name: "The Zodiac Race - A Drama Script",
  },
  "Fiction/Finished.md": { tags: ["#personal", "#reflection"], type: "Short Story", name: "Finished" },

  // Poetry
  "Poetry/Awakening.md": { tags: ["#nature", "#reflection"], type: "Poem", name: "Awakening" },
  "Poetry/Bar of Metal.md": { tags: ["#nature", "#imagery"], type: "Poem", name: "Bar of Metal" },
  "Poetry/Can't.md": { tags: ["#emotion", "#personal"], type: "Poem", name: "Can't" },
  "Poetry/Celestial.md": { tags: ["#space", "#wonder"], type: "Poem", name: "Celestial" },
  "Poetry/Constellation.md": { tags: ["#space", "#poetry"], type: "Poem", name: "Constellation" },
  "Poetry/Dragon.md": { tags: ["#fantasy", "#imagery"], type: "Poem", name: "Dragon" },
  "Poetry/High Rolling Sun.md": { tags: ["#nature", "#imagery"], type: "Poem", name: "High Rolling Sun" },
  "Poetry/Irony.md": { tags: ["#reflection", "#emotion"], type: "Poem", name: "Irony" },
  "Poetry/Krill.md": { tags: ["#ocean", "#nature"], type: "Poem", name: "Krill" },
  "Poetry/Royal Lament.md": { tags: ["#emotion", "#narrative"], type: "Poem", name: "Royal Lament" },
  "Poetry/Secrets.md": { tags: ["#emotion", "#mystery"], type: "Poem", name: "Secrets" },
  "Poetry/Steam.md": { tags: ["#imagery", "#nature"], type: "Poem", name: "Steam" },
  "Poetry/Still.md": { tags: ["#peace", "#reflection"], type: "Poem", name: "Still" },
  "Poetry/Storm.md": { tags: ["#nature", "#drama"], type: "Poem", name: "Storm" },
  "Poetry/The Bush.md": { tags: ["#nature", "#australian"], type: "Poem", name: "The Bush" },
  "Poetry/Train.md": { tags: ["#travel", "#imagery"], type: "Poem", name: "Train" },

  // Add more as needed...
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
description: A comprehensive, auto-updating index of all stories with interactive filters and tags
---

# 📚 Story Database

A complete, auto-updating collection of all stories, organized by category with interactive filters and tags.

<div id="filterContainer" style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px;">

## 🔍 Interactive Filters

<div style="margin-bottom: 10px;">
  <strong>Filter by Category:</strong><br/>
  <button class="filter-btn" data-filter="all" onclick="filterStories('all')">📚 All</button>
`

  for (const category of categories) {
    if (allStories[category] && allStories[category].length > 0) {
      const emoji = categoryEmojis[category] || "📄"
      const count = allStories[category].length
      markdown += `  <button class="filter-btn" data-filter="${category}" onclick="filterStories('${category}')">${emoji} ${category}</button>\n`
    }
  }

  markdown += `</div>

<div style="margin-bottom: 10px;">
  <strong>Filter by Tag:</strong><br/>
  <span id="tagButtons">`

  const sortedTags = Array.from(allTags).sort()
  for (const tag of sortedTags) {
    markdown += `<button class="tag-btn" data-tag="${tag}" onclick="filterByTag('${tag}')">${tag}</button> `
  }

  markdown += `</span>
  <button onclick="clearFilters()" style="margin-left: 10px;">❌ Clear Filters</button>
</div>

<div style="margin-top: 15px;">
  <strong>Search:</strong><br/>
  <input type="text" id="searchInput" placeholder="Search stories..." onkeyup="searchStories()" style="padding: 8px; width: 300px; border: 1px solid #ccc; border-radius: 4px;">
</div>

</div>

## 📊 Statistics

- **Total Stories:** ${totalStories} files
- **Categories:** ${categories.filter((c) => allStories[c]?.length > 0).length}
- **Unique Tags:** ${allTags.size}

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
      markdown += `| [${story.title}](${story.path}) | ${tagsStr} | ${story.type} |\n`
    }

    markdown += `\n`
  }

  // Tag frequency stats
  markdown += `## 🏷️ Popular Tags\n\n**By Frequency:**\n`

  const tagFrequency: { [key: string]: number } = {}
  for (const categoryStories of Object.values(allStories)) {
    for (const story of categoryStories) {
      for (const tag of story.tags) {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1
      }
    }
  }

  const sortedByFreq = Object.entries(tagFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)

  for (const [tag, count] of sortedByFreq) {
    markdown += `- ${tag} (${count})\n`
  }

  markdown += `\n---\n\n`
  markdown += `**Auto-generated:** ${new Date().toLocaleString()}\n`
  markdown += `**Total Words:** Comprehensive multi-genre collection\n\n`

  markdown += `
<script>
let currentFilters = { category: null, tags: [] };

function filterStories(category) {
  currentFilters.category = category === 'all' ? null : category;
  applyFilters();
  updateButtonStates();
}

function filterByTag(tag) {
  const idx = currentFilters.tags.indexOf(tag);
  if (idx > -1) {
    currentFilters.tags.splice(idx, 1);
  } else {
    currentFilters.tags.push(tag);
  }
  applyFilters();
  updateButtonStates();
}

function clearFilters() {
  currentFilters = { category: null, tags: [] };
  document.getElementById('searchInput').value = '';
  applyFilters();
  updateButtonStates();
}

function searchStories() {
  applyFilters();
}

function applyFilters() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('table tbody tr');
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const categoryMatch = !currentFilters.category || row.closest('section')?.textContent.includes(currentFilters.category);
    const tagMatch = currentFilters.tags.length === 0 || currentFilters.tags.some(tag => text.includes(tag.toLowerCase()));
    const searchMatch = !searchTerm || text.includes(searchTerm);
    
    row.style.display = (categoryMatch && tagMatch && searchMatch) ? '' : 'none';
  });
}

function updateButtonStates() {
  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.style.backgroundColor = currentFilters.tags.includes(btn.dataset.tag) ? '#4CAF50' : '';
    btn.style.color = currentFilters.tags.includes(btn.dataset.tag) ? 'white' : '';
  });
}
</script>

<style>
.filter-btn, .tag-btn {
  padding: 6px 12px;
  margin: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover, .tag-btn:hover {
  background: #f0f0f0;
  border-color: #999;
}

.filter-btn:active {
  background: #4CAF50;
  color: white;
}
</style>
`

  fs.writeFileSync(OUTPUT_FILE, markdown)
  console.log(`✅ Story Database generated with ${totalStories} stories!`)
  console.log(`📁 Output: ${OUTPUT_FILE}`)
}

generateDatabase()
