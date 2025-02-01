import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'dabluepiano/kidscollab',
        // from data-repo-id
        repoId: 'R_kgDONnbHKw',
        //from data-category
        category: 'Announcements',
        //from data-category-id
        categoryId: 'DIC_kwDONnbHK84Cl3wA',
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/dabluepiano/kidscollab",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs({
      spacerSymbol: "❯❯", // symbol between crumbs
      rootName: "Home", // name of first/root element
      resolveFrontmatterTitle: true, // whether to resolve folder names through frontmatter titles
      hideOnRoot: true, // whether to hide breadcrumbs on root `index.md` page
      showCurrentPage: true, // whether to display the current page in the breadcrumbs
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      filterFn: (node) => {
        // exclude files with the tag "explorerexclude"
        return node.file?.frontmatter?.tags?.includes("FolderNote") !== true
      },
    })),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      title: "Explorer", // title of the explorer component
      folderClickBehavior: "link", // what happens when a folder is clicked
      folderDefaultState: "collapsed", // default state of folders
      useSavedState: true, // whether to save the state of the explorer
      // what order to apply functions in
      order: ["filter", "map", "sort"],
    })),
  ],
  right: [],
}

