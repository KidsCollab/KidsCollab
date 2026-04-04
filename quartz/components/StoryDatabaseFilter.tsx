import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import storyFilterScript from "./scripts/storyDatabaseFilter.inline"
// @ts-ignore
import style from "./styles/storyDatabaseFilter.scss"

const StoryDatabaseFilter: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "KidsCollab/Story-Database") {
    return null
  }

  return (
    <div id="story-filter-container" class="story-database-filter"></div>
  )
}

StoryDatabaseFilter.css = style
StoryDatabaseFilter.afterDOMLoaded = storyFilterScript

export default (() => StoryDatabaseFilter) satisfies QuartzComponentConstructor
