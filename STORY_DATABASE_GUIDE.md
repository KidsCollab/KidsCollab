# 📚 Adaptive Story Database Guide

Your Story Database now has **auto-updating** capability and **interactive filtering**!

## ✨ Features

### 🔄 Auto-Update
The database automatically scans your story folders and regenerates when you run the command.

### 🎯 Interactive Filters
- **Category filters** - Show only stories from specific categories
- **Tag filters** - Click tags to filter by multiple tags at once
- **Search** - Real-time search across all story titles and metadata
- **Clear filters** - Reset all filters with one click

---

## 🚀 How to Use

### Generate/Update the Database

Run this command whenever you add new stories:

```bash
npm run gen-stories
```

Or directly:

```bash
ts-node genStoryDatabase.ts
```

### What It Does

✅ Scans all story directories (`Fiction/`, `Poetry/`, etc.)  
✅ Detects new files automatically  
✅ Extracts metadata (tags, story type)  
✅ Regenerates `content/KidsCollab/Story Database.md`  
✅ Updates statistics and tag counts  

---

## 🎮 Using the Interactive Filters

### Browse by Category
Click category buttons at the top to show only stories from that category:
- 📖 Fiction
- 🎭 Poetry
- 📝 Non-Fiction
- ✍️ Persuasive
- 📔 Diaries
- 🗣️ Speeches
- etc.

### Filter by Tags
Click multiple tag buttons to see only stories with those tags:
- `#adventure` - Action/adventure stories
- `#personal` - Personal reflections
- `#creative` - Creative writing
- `#drama` - Dramatic narratives
- etc.

### Search
Type in the search box to find stories by title or content instantly.

### Clear Filters
Click the **❌ Clear All Filters** button to reset everything.

---

## 📝 Adding Metadata

The script recognizes story metadata from the code. To customize tags and types for new stories, edit `genStoryDatabase.ts`:

```typescript
const storyMetadata = {
  "Fiction/My Story.md": { 
    tags: ["#adventure", "#mystery"], 
    type: "Short Story", 
    name: "My Story" 
  },
  // Add more here...
}
```

Then run:
```bash
npm run gen-stories
```

---

## 📊 Viewing Updates

After running the generate command:
1. The database updates automatically
2. Visit [Story Database](content/KidsCollab/Story Database.md) to see the updated version
3. Interactive filters are ready to use!

---

## 💡 Tips

- **Regular updates**: Run `npm run gen-stories` after adding new stories
- **Batch updates**: Update multiple stories, then run the command once
- **Git integration**: Commit the updated `Story Database.md` file

Enjoy exploring your adaptive story collection! 📚✨
