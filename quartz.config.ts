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
        header: "Atkinson Hyperlegible",
        body: "Atkinson Hyperlegible",
        code: "jetbrains-mono",
      },
      colors: {
        lightMode: {
          light: "#fffef9", // Warm off-white base
          lightgray: "#e8e0d4", // Warm sand
          gray: "#9a8b7a", // Warm taupe
          darkgray: "#4a4035", // Rich dark taupe for body text
          dark: "#2d2420", // Dark espresso for headings
          secondary: "#c25e00", // Vibrant burnt orange for links
          tertiary: "#0d9488", // Teal for hover state
          highlight: "rgba(194, 94, 0, 0.35)", // Warm orange highlight
          textHighlight: "#fef3c7", // Soft amber text highlight
        },
        darkMode: {
          light: "#0f1419",
          lightgray: "#1e293b",
          gray: "#475569",
          darkgray: "#94a3b8",
          dark: "#f1f5f9",
          secondary: "#3b82f6",
          tertiary: "#f59e0b",
          highlight: "rgba(59, 130, 246, 0.5)",
          textHighlight: "#fbbf24",
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
