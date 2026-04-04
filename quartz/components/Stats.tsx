import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/stats.scss"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"

type CategoryStats = {
  category: string
  count: number
}

type TagStats = {
  tag: string
  count: number
}

type AuthorStats = {
  author: string
  count: number
}

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

export interface Options {
  buildDate?: string
  stats?: ComputedStats
  noDisplay?: boolean
}

const defaultOptions: Options = {}

export default ((userOpts?: Partial<Options>) => {
  const Stats: QuartzComponent = ({ cfg, allFiles, displayClass }: QuartzComponentProps) => {
    const opts = { ...defaultOptions, ...userOpts }

    // Skip rendering for noDisplay (used in footer to avoid duplicate)
    if (opts.noDisplay) {
      return null
    }

    // Compute stats from allFiles if we have the data embedded
    const stats = opts.stats

    if (!stats) {
      return (
        <div class={classNames(displayClass, "stats-container")}>
          <h1>Site Statistics</h1>
          <p>Statistics could not be loaded.</p>
        </div>
      )
    }

    const buildDate = stats.lastUpdated || "Unknown"

    return (
      <div class={classNames(undefined, "stats-container")}>
        <h1>Site Statistics</h1>
        <p class="stats-subtitle">Last updated: {buildDate}</p>

        {/* Overview Cards */}
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{stats.totalFiles}</div>
            <div class="stat-label">Total Pages</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{stats.totalWords.toLocaleString()}</div>
            <div class="stat-label">Total Words</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{stats.totalTags}</div>
            <div class="stat-label">Unique Tags</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{stats.totalAuthors}</div>
            <div class="stat-label">Contributors</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{stats.categories.length}</div>
            <div class="stat-label">Categories</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div class="stats-section">
          <h2>Categories</h2>
          <div class="category-breakdown">
            {stats.categories.map((cat) => (
              <div class="category-item">
                <span>{cat.category}</span>
                <span class="count">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        {stats.authors.length > 0 && (
          <div class="stats-section">
            <h2>Contributors</h2>
            <div class="category-breakdown">
              {stats.authors.slice(0, 20).map((author) => (
                <div class="author-item">
                  <span>{author.author}</span>
                  <span class="count">{author.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div class="stats-section">
          <h2>Tags</h2>
          <div class="tag-cloud">
            {stats.tags.slice(0, 50).map((tagInfo) => (
              <a class="tag-item" href={resolveRelative("stats" as any, `tags/${tagInfo.tag}` as any)}>
                {tagInfo.tag} ({tagInfo.count})
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  Stats.css = style
  return Stats
}) satisfies QuartzComponentConstructor
