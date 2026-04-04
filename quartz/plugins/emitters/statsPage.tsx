import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { PageLayout, SharedLayout } from "../../cfg"
import { FilePath, FullSlug, joinSegments, pathToRoot } from "../../util/path"
import { write } from "./helpers"
import DepGraph from "../../depgraph"
import StatsConstructor from "../../components/Stats"

type CategoryStats = { category: string; count: number }

function countWords(tree: any): number {
  let count = 0
  function walk(node: any) {
    if (!node) return
    if (node.type === "text" || node.type === "code" || node.type === "inlineCode") {
      count += (node.value || "").split(/\s+/).filter(Boolean).length
    }
    if (node.children) {
      node.children.forEach(walk)
    }
  }
  walk(tree)
  return count
}
type TagStats = { tag: string; count: number }
type AuthorStats = { author: string; count: number }
type ComputedStats = {
  totalFiles: number
  totalWords: number
  fictionCount: number
  nonFictionCount: number
  poetryCount: number
  persuasiveCount: number
  diaryCount: number
  totalTags: number
  totalAuthors: number
  lastUpdated: string
  categories: CategoryStats[]
  tags: TagStats[]
  authors: AuthorStats[]
}

function computeStats(allFiles: any[], allTrees: any[]): ComputedStats {
  const now = new Date()
  const categories: Record<string, number> = {}
  const tagCounts: Record<string, number> = {}
  const authorCounts: Record<string, number> = {}

  let fiction = 0
  let nonFiction = 0
  let poetry = 0
  let persuasive = 0
  let diary = 0
  let totalWords = 0

  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i]
    // Category detection from tags
    const tags: string[] = file.frontmatter?.tags ?? []

    // Word count from tree
    if (allTrees[i]) {
      totalWords += countWords(allTrees[i])
    }

    for (const tag of tags) {
      // Category detection from section tags
      if (tag.startsWith("section/KidsCollab/")) {
        const cat = tag.replace("section/KidsCollab/", "")
        categories[cat] = (categories[cat] || 0) + 1
        if (cat === "Fiction") fiction++
        if (cat === "Non-Fiction") nonFiction++
        if (cat === "Poetry") poetry++
        if (cat === "Persuasive") persuasive++
        if (cat === "Diaries") diary++
      }

      // Tag counting (exclude section and author tags)
      if (!tag.startsWith("section/") && !tag.startsWith("author/")) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      }

      // Author detection (skip FolderNote which is a marker tag, not an author)
      if (tag.startsWith("author/") && tag.replace("author/", "") !== "FolderNote") {
        const author = tag.replace("author/", "")
        authorCounts[author] = (authorCounts[author] || 0) + 1
      }
    }
  }

  const categoryList: CategoryStats[] = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => ({ category, count }))

  const tagList: TagStats[] = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }))

  const authorList: AuthorStats[] = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([author, count]) => ({ author, count }))

  return {
    totalFiles: allFiles.length,
    totalWords: totalWords,
    fictionCount: fiction,
    nonFictionCount: nonFiction,
    poetryCount: poetry,
    persuasiveCount: persuasive,
    diaryCount: diary,
    totalTags: Object.keys(tagCounts).length,
    totalAuthors: Object.keys(authorCounts).length,
    lastUpdated: now.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    categories: categoryList,
    tags: tagList,
    authors: authorList,
  }
}

export const StatsPage: QuartzEmitterPlugin = (_userOpts) => {
  const opts: SharedLayout & PageLayout = {
    head: StatsConstructor(),
    header: [],
    beforeBody: [],
    pageBody: StatsConstructor(),
    afterBody: [],
    left: [],
    right: [],
    footer: StatsConstructor({ noDisplay: true }),
  }

  const Head = HeaderConstructor()
  const Body = BodyConstructor()

  const Stats = StatsConstructor()
  const {
    head,
    header,
    beforeBody,
    pageBody,
    afterBody,
    left: Left,
    right: Right,
    footer: Footer,
  } = opts

  return {
    name: "StatsPage",
    getQuartzComponents() {
      return [Head, Body, Stats, Footer]
    },
    async getDependencyGraph(_ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()
      for (const [_tree, file] of content) {
        const sourcePath = file.data.filePath!
        graph.addEdge(
          sourcePath,
          joinSegments(_ctx.argv.output, "stats.html") as FilePath,
        )
      }
      return graph
    },
    async emit(ctx, content, resources): Promise<FilePath[]> {
      const cfg = ctx.cfg.configuration
      const allFiles = content.map((c) => c[1].data)
      const allTrees = content.map((c) => c[0])

      const stats = computeStats(allFiles, allTrees)

      // Inject stats into Stats component via opts
      const StatsWithStats = StatsConstructor({ stats })
      const FooterStats = StatsConstructor({ stats, noDisplay: true })
      const externalResources = pageResources(pathToRoot("stats" as FullSlug), { slug: "stats" } as any, resources)
      const componentData: QuartzComponentProps & { displayClass?: string } = {
        ctx,
        fileData: { slug: "stats" } as any,
        externalResources,
        cfg,
        children: [],
        allFiles,
        tree: {} as any,
        displayClass: "stats-page",
      }

      // Build full page HTML using renderPage
      const fullHtml = renderPage(cfg, "stats" as FullSlug, componentData, {
        head: Head,
        header,
        beforeBody,
        pageBody: StatsWithStats,
        afterBody,
        left: Left,
        right: Right,
        footer: FooterStats,
      }, externalResources)

      const fp = await write({
        ctx,
        content: fullHtml,
        slug: "stats" as FullSlug,
        ext: ".html",
      })

      return [fp]
    },
  }
}
