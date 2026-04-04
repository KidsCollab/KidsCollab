interface Story {
  category: string
  tags: string[]
  title: string
  row: HTMLTableRowElement
  h2: Element
  tableWrap: Element
  metaWrap: Element
}

let stories: Story[] = []
let activeCategories = new Set<string>()
let activeTags = new Set<string>()
let searchQuery = ""

function parseStories() {
  const article = document.querySelector("article.popover-hint")
  if (!article) return

  // Find all h2 elements that are followed by a table
  const allH2s = article.querySelectorAll("h2")

  for (const h2 of Array.from(allH2s)) {
    const id = h2.id || ""
    // Skip the Statistics heading
    if (id.includes("statistics") || id.includes("story-database")) continue

    const textContent = h2.textContent?.trim() || ""
    // Remove emoji prefix and get category name
    const category = textContent.replace(/^[\s\u{1F000}-\u{1FFFF}]+/u, "").trim()
    if (!category) continue

    // Walk siblings after h2 to find the meta block and the table wrapper
    let next: Element | null = h2.nextElementSibling
    let metaWrap: Element | null = null
    let tableWrap: Element | null = null
    let table: HTMLTableElement | null = null

    while (next) {
      // table might be inside a div.table-container
      if (next.tagName === "DIV" && next.classList.contains("table-container")) {
        tableWrap = next
        table = next.querySelector("table")
        break
      }
      if (next.tagName === "TABLE") {
        tableWrap = next
        table = next as HTMLTableElement
        break
      }
      // meta code block
      if (next.tagName === "FIGURE" || (next.tagName === "PRE" && next.querySelector("code"))) {
        metaWrap = next
      }
      next = next.nextElementSibling
    }

    if (!table) continue
    // Rows may be in tbody or directly
    const rows = table.querySelectorAll("tbody tr") || table.querySelectorAll("tr")
    for (const row of Array.from(rows)) {
      const tr = row as HTMLTableRowElement
      const firstCell = tr.cells[0]
      if (!firstCell) continue
      const link = firstCell.querySelector("a")
      const title = link?.textContent?.trim() ?? firstCell.textContent?.trim() ?? ""
      if (!title) continue

      const tagCell = tr.cells[1]
      const tagText = tagCell?.textContent?.trim() ?? ""
      const tags = tagText
        .split(/\s+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0)

      stories.push({
        category,
        tags,
        title,
        row: tr,
        h2,
        tableWrap,
        metaWrap: metaWrap || h2,
      })
    }
  }
}

function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const s of stories) s.tags.forEach((t) => tags.add(t))
  return Array.from(tags).sort()
}

function getAllCategories(): string[] {
  const cats = new Set<string>()
  for (const s of stories) cats.add(s.category)
  return Array.from(cats).sort()
}

function applyFilters() {
  let visibleCount = 0
  const categoryVisibleCount = new Map<string, number>()

  for (const s of stories) {
    const matchCategory =
      activeCategories.size === 0 || activeCategories.has(s.category)
    const matchTags =
      activeTags.size === 0 || Array.from(activeTags).every((t) => s.tags.includes(t))
    const matchSearch =
      searchQuery === "" || s.title.toLowerCase().includes(searchQuery.toLowerCase())

    const show = matchCategory && matchTags && matchSearch
    s.row.style.display = show ? "" : "none"
    if (show) {
      visibleCount++
      categoryVisibleCount.set(
        s.category,
        (categoryVisibleCount.get(s.category) ?? 0) + 1,
      )
    }
  }

  // Show/hide each category section
  const seen = new Set<string>()
  for (const s of stories) {
    if (seen.has(s.category)) continue
    seen.add(s.category)

    const count = categoryVisibleCount.get(s.category) ?? 0
    const visible = count > 0
    s.h2.style.display = visible ? "" : "none"
    s.tableWrap.style.display = visible ? "" : "none"
    s.metaWrap.style.display = visible ? "" : "none"
  }

  const countEl = document.getElementById("filter-count")
  if (countEl) countEl.textContent = `${visibleCount} of ${stories.length} stories`
}

function buildFilterUI() {
  const container = document.getElementById("story-filter-container")
  if (!container) return

  const categories = getAllCategories()
  const tags = getAllTags()

  let html = ""

  if (categories.length > 0) {
    html += '<div class="filter-section"><span class="filter-label">Category:</span><div class="filter-buttons">'
    for (const cat of categories) {
      html += `<button class="filter-btn" data-category="${cat}">${cat}</button>`
    }
    html += "</div></div>"
  }

  if (tags.length > 0) {
    html += '<div class="filter-section"><span class="filter-label">Tags:</span><div class="filter-buttons">'
    for (const tag of tags) {
      html += `<button class="filter-btn" data-tag="${tag}">${tag}</button>`
    }
    html += "</div></div>"
  }

  html += '<div class="filter-section search-section"><input type="text" class="filter-search-input" id="filter-search" placeholder="Search stories..." /></div>'
  html += '<div class="filter-actions"><button class="clear-btn" id="clear-filters">Clear All Filters</button></div>'
  html += `<div class="filter-count" id="filter-count">${stories.length} stories</div>`

  container.innerHTML = html

  // Category button handlers
  container.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = (btn as HTMLElement).dataset.category!
      btn.classList.toggle("active")
      if (activeCategories.has(cat)) activeCategories.delete(cat)
      else activeCategories.add(cat)
      applyFilters()
    })
  })

  // Tag button handlers
  container.querySelectorAll('[data-tag]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = (btn as HTMLElement).dataset.tag!
      btn.classList.toggle("active")
      if (activeTags.has(tag)) activeTags.delete(tag)
      else activeTags.add(tag)
      applyFilters()
    })
  })

  // Search input handler
  const searchInput = document.getElementById("filter-search") as HTMLInputElement
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = (e.target as HTMLInputElement).value
      applyFilters()
    })
  }

  // Clear button handler
  const clearBtn = document.getElementById("clear-filters")
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      activeCategories.clear()
      activeTags.clear()
      searchQuery = ""
      container.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      const si = document.getElementById("filter-search") as HTMLInputElement
      if (si) si.value = ""
      applyFilters()
    })
  }
}

function init() {
  stories = []
  activeCategories = new Set()
  activeTags = new Set()
  searchQuery = ""
  parseStories()
  buildFilterUI()
}

document.addEventListener("nav", init)
init()
