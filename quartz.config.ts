import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "KidsCollab",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: 'google', tagId: 'G-779LQMZ7RP'
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "dmSans",
        body: "Atkinson Hyperlegible",
        code: "jetbrains-mono",
      },
      colors: {
        lightMode: {
          light: "#f0f8ff", // Brighter, more vibrant light blue
          lightgray: "#d0e0ff", // More vibrant blue-gray
          gray: "#6b9bd1", // More saturated blue-gray
          darkgray: "#2c5282", // More vibrant dark gray
          dark: "#1a365d", // Deeper, more vibrant dark blue
          secondary: "#0066cc", // Brighter, more vibrant blue
          tertiary: "#ff6600", // Brighter, more vibrant orange
          highlight: "rgba(0, 102, 204, 0.4)", // More vibrant highlight
          textHighlight: "#ffcc00", // Brighter yellow-orange
        },
        darkMode: {
          light: "#0f1419", // Darker, more vibrant dark background
          lightgray: "#1e293b", // More vibrant dark border
          gray: "#475569", // More vibrant gray
          darkgray: "#94a3b8", // Brighter text
          dark: "#f1f5f9", // Brighter headings
          secondary: "#3b82f6", // Keep or make brighter
          tertiary: "#f59e0b", // Brighter amber
          highlight: "rgba(59, 130, 246, 0.5)", // More vibrant
          textHighlight: "#fbbf24", // Brighter
        },
      },     
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
