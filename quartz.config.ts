import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Kidscollab β",
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
        body: "lexend",
        code: "jetbrains-mono",
      },
      colors: {
        lightMode: {
          light: "#f4f8fb", // Soft and airy light blue-gray for page background
          lightgray: "#e0e6f9", // Subtle blue-gray for borders, keeping the theme light and airy
          gray: "#8fa6c1", // Muted slate blue for links and heavier borders, still cohesive
          darkgray: "#4b5d70", // A softer, neutral gray for readable body text
          dark: "#172c3b", // Deep blue-gray for headings and important text, providing contrast
          secondary: "#0077b6", // Strong blue for links and active elements, keeping it vibrant
          tertiary: "#ff8c00", // Warm, subtle orange for hover states, calls to action, and highlights
          highlight: "rgba(0, 119, 182, 0.3)", // Light blue highlight for internal link background and highlighted areas
          textHighlight: "#ffb84d", // Softer orange-yellow for markdown highlighted text backgrounds
        },
        darkMode: {
          light: "#121d2b", // Dark navy blue for page background to keep things sleek and professional
          lightgray: "#2c3e5c", // Muted dark blue-gray for borders, contrasting well with dark background
          gray: "#64748b", // Subtle gray-blue for body text and less prominent links
          darkgray: "#a0b1ca", // Softer gray-blue for readable body text, perfect for dark mode
          dark: "#e0e6f1", // Light off-white for headings, keeping it easy on the eyes in dark mode
          secondary: "#3b82f6", // Lively blue for links and current section highlights in dark mode
          tertiary: "#ffb84d", // Soft amber orange for hover states and highlights, giving warmth
          highlight: "rgba(59, 130, 246, 0.4)", // More prominent blue highlight for link backgrounds and hover states
          textHighlight: "#fdbb2d", // Bright yellow-orange for markdown highlighted text in dark mode
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
