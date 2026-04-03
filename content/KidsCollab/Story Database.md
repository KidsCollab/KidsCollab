---
title: Story Database
description: A comprehensive, auto-updating index of all stories with interactive filters and tags
---

# 📚 Story Database

A complete, auto-updating collection of all stories with interactive filters and search.

<div id="filterContainer" style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px;">

## 🔍 Interactive Filters

<div style="margin-bottom: 10px;">
  <strong>Filter by Category:</strong><br/>
  <button class="filter-btn" data-filter="all" onclick="filterStories('all')">📚 All Categories</button>
  <button class="filter-btn" data-filter="Fiction" onclick="filterStories('Fiction')">📖 Fiction</button>
  <button class="filter-btn" data-filter="Poetry" onclick="filterStories('Poetry')">🎭 Poetry</button>
  <button class="filter-btn" data-filter="Non-Fiction" onclick="filterStories('Non-Fiction')">📝 Non-Fiction</button>
  <button class="filter-btn" data-filter="Persuasive" onclick="filterStories('Persuasive')">✍️ Persuasive</button>
  <button class="filter-btn" data-filter="Speeches" onclick="filterStories('Speeches')">🗣️ Speeches</button>
  <button class="filter-btn" data-filter="Diaries" onclick="filterStories('Diaries')">📔 Diaries</button>
</div>

<div style="margin-bottom: 10px;">
  <strong>Filter by Tag:</strong><br/>
  <div id="tagButtons">
    <button class="tag-btn" data-tag="#adventure" onclick="toggleTag('#adventure')">#adventure</button>
    <button class="tag-btn" data-tag="#personal" onclick="toggleTag('#personal')">#personal</button>
    <button class="tag-btn" data-tag="#creative" onclick="toggleTag('#creative')">#creative</button>
    <button class="tag-btn" data-tag="#drama" onclick="toggleTag('#drama')">#drama</button>
    <button class="tag-btn" data-tag="#nature" onclick="toggleTag('#nature')">#nature</button>
    <button class="tag-btn" data-tag="#science" onclick="toggleTag('#science')">#science</button>
    <button class="tag-btn" data-tag="#poetry" onclick="toggleTag('#poetry')">#poetry</button>
    <button class="tag-btn" data-tag="#educational" onclick="toggleTag('#educational')">#educational</button>
  </div>
  <button onclick="clearFilters()" style="margin-top: 8px; padding: 6px 12px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer;">❌ Clear All Filters</button>
</div>

<div style="margin-top: 15px;">
  <strong>Search Stories:</strong><br/>
  <input type="text" id="searchInput" placeholder="Search by title, type, or content..." onkeyup="searchStories()" style="padding: 8px; width: 100%; max-width: 500px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;">
</div>

</div>



## 📖 Fiction

**Category:** Narrative stories, short fiction, and creative tales

| Story | Tags | Type |
|-------|------|------|
| [A Hole in the Fence](Fiction/A%20Hole%20in%20the%20Fence.md) | #adventure #drama | Short Story |
| [A Monster's Identity](Fiction/A%20Monster's%20Identity.md) | #creative #mystery | Short Story |
| [A New Life in New Zealand](Fiction/A%20New%20Life%20in%20New%20Zealand.md) | #adventure #family | Short Story |
| [A Reckless Rodeo](Fiction/A%20Reckless%20Rodeo.md) | #adventure #action | Short Story |
| [Beyond Swamp Bottom](Fiction/Beyond%20Swamp%20Bottom.md) | #adventure #fantasy | Short Story |
| [Desperation](Fiction/Desperation.md) | #drama #emotional | Short Story |
| [Different](Fiction/Different.md) | #identity #personal | Short Story |
| [Grey City](Fiction/Grey%20City.md) | #sci-fi #urban | Short Story |
| [If Looks Could Kill](Fiction/If%20Looks%20Could%20Kill.md) | #drama #mystery | Short Story |
| [Moving Home](Fiction/Moving%20Home.md) | #personal #family | Short Story |
| [Nay Farn](Fiction/Nay%20Farn.md) | #adventure #fantasy | Short Story |
| [Paintball - A Drama Script](Fiction/Paintball%20-%20A%20Drama%20Script.md) | #drama #script | Drama Script |
| [Rain, Town, Rescue, Battle](Fiction/Rain,%20Town,%20Rescue,%20Battle.md) | #action #adventure | Short Story |
| [Razing](Fiction/Razing.md) | #action #drama | Short Story |
| [Pinocchio Essay](Fiction/Pinocchio%20Essay.md) | #analysis #literature | Essay |
| [The Gum Family Finds Home](Fiction/The%20Gum%20Family%20Finds%20Home.md) | #family #humor | Short Story |
| [The Koopas](Fiction/The%20Koopas.md) | #family #creative | Short Story |
| [The Missing Mascots](Fiction/The%20Missing%20Mascots.md) | #mystery #school | Short Story |
| [The Mountain](Fiction/The%20Mountain.md) | #adventure #nature | Short Story |
| [The Terror of Olympus](Fiction/The%20Terror%20of%20Olympus.md) | #mythology #action | Short Story |
| [The Zodiac Race - A Drama Script](Fiction/The%20Zodiac%20Race%20-%20A%20Drama%20Script.md) | #drama #script | Drama Script |
| [Finished](Fiction/Finished.md) | #personal #reflection | Short Story |

**Fiction Collections:**

### Alone Stories
Collaborative collection of survival/isolation stories

| Story | Tags |
|-------|------|
| [Sidney L - Alone](Fiction/Alone%20Stories/Sidney%20L%20-%20Alone.md) | #survival #drama |
| [Nathan W - Alone](Fiction/Alone%20Stories/Nathan%20W%20-%20Alone.md) | #survival #drama |
| [Marcus C - Alone](Fiction/Alone%20Stories/Marcus%20C%20-%20Alone.md) | #survival #drama |
| [Leo J - Alone](Fiction/Alone%20Stories/Leo%20J%20-%20Alone.md) | #survival #drama |

### Flotsam Stories
Stories of discovery and the ocean

| Story | Tags |
|-------|------|
| [Robo-Fish](Fiction/Flotsam%20Stories/Robo-Fish.md) | #sci-fi #adventure |
| [Glorious Dunes](Fiction/Flotsam%20Stories/Glorious%20Dunes.md) | #adventure #nature |

### The Baguette Bible
Creative storytelling series

| Story | Tags |
|-------|------|
| [Suspensions](Fiction/The%20Baguette%20Bible/Suspensions.md) | #creative #humor |

---

## 🎭 Poetry

**Category:** Poems of various styles and themes

| Story | Tags | Type |
|-------|------|------|
| [Awakening](Poetry/Awakening.md) | #nature #reflection | Poem |
| [Bar of Metal](Poetry/Bar%20of%20Metal.md) | #nature #imagery | Poem |
| [Can't](Poetry/Can't.md) | #emotion #personal | Poem |
| [Celestial](Poetry/Celestial.md) | #space #wonder | Poem |
| [Constellation](Poetry/Constellation.md) | #space #poetry | Poem |
| [Dragon](Poetry/Dragon.md) | #fantasy #imagery | Poem |
| [High Rolling Sun](Poetry/High%20Rolling%20Sun.md) | #nature #imagery | Poem |
| [Irony](Poetry/Irony.md) | #reflection #emotion | Poem |
| [Krill](Poetry/Krill.md) | #ocean #nature | Poem |
| [Royal Lament](Poetry/Royal%20Lament.md) | #emotion #narrative | Poem |
| [Secrets](Poetry/Secrets.md) | #emotion #mystery | Poem |
| [Steam](Poetry/Steam.md) | #imagery #nature | Poem |
| [Still](Poetry/Still.md) | #peace #reflection | Poem |
| [Storm](Poetry/Storm.md) | #nature #drama | Poem |
| [The Bush](Poetry/The%20Bush.md) | #nature #australian | Poem |
| [Train](Poetry/Train.md) | #travel #imagery | Poem |

**Poetry Collections:**

### Colour Poems
Poems inspired by colors

| Story | Tags |
|-------|------|
| [Blue](Poetry/Colour%20Poems/Blue.md) | #color #imagery |
| [Green](Poetry/Colour%20Poems/Green.md) | #color #imagery |
| [Grey](Poetry/Colour%20Poems/Grey.md) | #color #emotion |
| [Turquoise](Poetry/Colour%20Poems/Turquoise.md) | #color #imagery |

### All Creatures
Nature and animal poetry

| Story | Tags |
|-------|------|
| [The Peacock](Poetry/All%20Creatures/The%20Peacock.md) | #animals #nature |
| [The Mangrove](Poetry/All%20Creatures/The%20Mangrove.md) | #nature #australian |
| [The Thorny Devil](Poetry/All%20Creatures/The%20Thorny%20Devil.md) | #animals #nature |

---

## 📝 Non-Fiction

**Category:** Educational and informative pieces

| Story | Tags | Type |
|-------|------|------|
| [American Tomato vs Australian Tomato](Non-Fiction/American%20Tomato%20vs%20Australian%20Tomato.md) | #comparison #agriculture | Essay |
| [Automobiles](Non-Fiction/Automobiles.md) | #technology #educational | Report |
| [Being Sustainable](Non-Fiction/Being%20Sustainable.md) | #environment #education | Essay |
| [Car Dependency](Non-Fiction/Car%20Dependency.md) | #urban #society | Essay |
| [Chinese Cinderella Chapter Study](Non-Fiction/Chinese%20Cindarella%20Chapter%20Study.md) | #literature #analysis | Study |
| [Coastal Taipans](Non-Fiction/Coastal%20Taipans.md) | #animals #science | Information Report |
| [Crocodile](Non-Fiction/Crocodile.md) | #animals #science | Information Report |
| [Galileo Galilei](Non-Fiction/Galileo%20Galilei.md) | #biography #science | Biography |
| [God, Gold and Glory](Non-Fiction/God,%20Gold%20and%20Glory.md) | #history #exploration | Essay |
| [Gold Mining in Australia](Non-Fiction/Gold%20Mining%20in%20Australia.md) | #history #australia | Report |
| [Korea](Non-Fiction/Korea.md) | #geography #culture | Report |
| [Leonhard Euler](Non-Fiction/Leonhard%20Euler.md) | #biography #mathematics | Biography |
| [Matthew Flinders](Non-Fiction/Matthew%20Flinders.md) | #biography #exploration | Biography |
| [Matthew Flinders (again)](Non-Fiction/Matthew%20Flinders%20(again).md) | #biography #exploration | Biography |
| [Snare Drum and Gong](Non-Fiction/Snare%20Drum%20and%20Gong.md) | #music #cultural | Essay |
| [Teamwork Requires Collective Needs Above His Own](Non-Fiction/Teamwork%20Requires%20Collective%20Needs%20Above%20His%20Own.md) | #teamwork #leadership | Essay |
| [The Illiad](Non-Fiction/The%20Illiad.md) | #literature #analysis | Analysis |
| [The States of Matter](Non-Fiction/The%20States%20of%20Matter.md) | #science #physics | Report |

**Non-Fiction Collections:**

### Gambia Information Reports
Country research reports

| Story | Tags |
|-------|------|
| [Sidney L - Gambia Information Report](Non-Fiction/Gambia%20Information%20Reports/Sidney%20L%20-%20Gambia%20Information%20Report.md) | #geography #africa |
| [Marcus C - Gambia Information Report](Non-Fiction/Gambia%20Information%20Reports/Marcus%20C%20-%20Gambia%20Information%20Report.md) | #geography #africa |
| [Leo J - Gambia Information Report](Non-Fiction/Gambia%20Information%20Reports/Leo%20J%20-%20Gambia%20Inormation%20Report.md) | #geography #africa |
| [Azlan U - Gambia Information Report](Non-Fiction/Gambia%20Information%20Reports/Azlan%20U%20-%20Gambia%20Information%20Report.md) | #geography #africa |

### Science Projects
Experimental reports

| Story | Tags |
|-------|------|
| [Effect of Household Chemicals on Leek Growth](Non-Fiction/Science%20Projects/Effect%20of%20Household%20Chemicals%20on%20Leek%20Growth.md) | #science #experiment |

### 2021-22 School Holidays
Travel/reflection pieces

| Story | Tags |
|-------|------|
| [Sidney L - 2021-22 School Holidays](Non-Fiction/2021-22%20School%20Holidays/Sidney%20L%20-%202021-22%20School%20Holidays.md) | #personal #travel |
| [Nathan W - 2021-22 School Holidays](Non-Fiction/2021-22%20School%20Holidays/Nathan%20W%20-%202021-22%20School%20Holidays.md) | #personal #travel |

---

## ✍️ Persuasive

**Category:** Persuasive and argumentative writing

| Story | Tags | Type |
|-------|------|------|
| [Dog](Persuasive/Dog.md) | #animals #persuasive | Essay |
| [Emails - A Monster Calls](Persuasive/Emails%20-%20A%20Monster%20Calls.md) | #creative #letters | Creative Writing |
| [Why is sleep important](Persuasive/Why%20is%20sleep%20important.md) | #health #persuasive | Essay |

**Persuasive Collections:**

### Emu Letters
Collaborative persuasive letter series

| Story | Tags |
|-------|------|
| [Emu Letters - Tasnova](Persuasive/Emu%20Letters/Emu%20Letters%20-%20Tasnova.md) | #letters #persuasive |
| [Emu Letters - Sidney](Persuasive/Emu%20Letters/Emu%20Letters%20-%20Sidney.md) | #letters #persuasive |
| [Emu Letters - Nathan](Persuasive/Emu%20Letters/Emu%20Letters%20-%20Nathan.md) | #letters #persuasive |
| [Emu Letters - Marcus](Persuasive/Emu%20Letters/Emu%20Letters%20-%20Marcus.md) | #letters #persuasive |

---

## 📔 Diaries

**Category:** Personal diary entries and reflections

| Story | Tags | Type |
|-------|------|------|
| [Arrawarra and Bingara Camping Diary](Diaries/Arrawarra%20and%20Bingara%20Camping%20Dairy.md) | #travel #personal #camping | Diary |
| [Bribie Island Camping Diary](Diaries/Bribie%20Island%20Camping%20Diary.md) | #travel #personal #camping | Diary |
| [South West Rocks Camping Diary](Diaries/South%20West%20Rocks%20Camping%20Diary.md) | #travel #personal #camping | Diary |

---

## 🗣️ Speeches

**Category:** Speeches, presentations, and oral pieces

| Story | Tags | Type |
|-------|------|------|
| [Nursery Rhymes](Speeches/Nursery%20Rhymes.md) | #creative #poetry | Collection |

**Speech Collections:**

### 2019
Year-based speeches

| Story | Tags |
|-------|------|
| [The Older I Get the Better](Speeches/2019/The%20Older%20I%20Get%20the%20Better.md) | #reflection #personal |
| [An Apple a Day Keeps the Doctor Away](Speeches/2019/An%20Apple%20a%20Day%20Keeps%20the%20Doctor%20Away.md) | #health #persuasive |

### 2020
Year-based speeches - "My Year in 2020"

| Story | Tags |
|-------|------|
| [Nathan W - My Year in 2020](Speeches/2020/Nathan%20W%20-%20My%20Year%20in%202020.md) | #personal #reflection |
| [Marcus C - My Year in 2020](Speeches/2020/Marcus%20C%20-%20My%20Year%20in%202020.md) | #personal #reflection |
| [Tasnova C - My Year in 2020](Speeches/2020/Tasnova%20C%20-%20My%20Year%20in%202020.md) | #personal #reflection |
| [Sidney L - My Year in 2020](Speeches/2020/Sidney%20L%20-%20My%20Year%20in%202020.md) | #personal #reflection |
| [Thomas M - My Year in 2020](Speeches/2020/Thomas%20M%20-%20My%20Year%20in%202020.md) | #personal #reflection |

### 2021
Year-based speeches

| Story | Tags |
|-------|------|
| [Bartolomeo Cristofori](Speeches/2021/Bartolomeo%20Cristofori.md) | #biography #history |
| [The Greatest Invention](Speeches/2021/The%20Greatest%20Invention.md) | #persuasive #creative |

### 2022
Year-based speeches

| Story | Tags |
|-------|------|
| [How the Olympics Unite the World](Speeches/2022/How%20the%20Olympics%20Unite%20the%20World.md) | #sports #unity |
| [Things I Can't Live Without](Speeches/2022/Things%20I%20Can't%20Live%20Without.md) | #personal #reflection |

### Notable People Project
Biographical speeches

| Story | Tags |
|-------|------|
| [Dr Karl](Speeches/Notable%20People%20Project%20Speeches/Dr%20Karl.md) | #biography #science |

---

## 🎨 Science Fiction

**Category:** Science fiction and futuristic stories

| Story | Tags | Type |
|-------|------|------|
| [Two Hearts of Two Worlds](Science%20Fiction/Two%20Hearts%20of%20Two%20Worlds.md) | #space #romance | Short Story |
| [Earth's Illness](Science%20Fiction/Earth's%20Illness.md) | #environment #dystopian | Short Story |

---

## 🎮 Video Game Reviews

**Category:** Video game reviews and gaming content

| Story | Tags | Type |
|-------|------|------|
| [Super Smash Bros Ultimate Tactics](Video%20Game%20Reviews/Super%20Smash%20Bros/Super%20Smash%20Bros%20Ultimate%20Tactics.md) | #gaming #guide | Guide |

**Gaming Collections:**

### Super Smash Bros
Gaming-related articles

| Story | Tags |
|-------|------|
| [Super Smash Bros](Video%20Game%20Reviews/Super%20Smash%20Bros/Super%20Smash%20Bros.md) | #gaming #review |

### Pokemon

| Story | Tags |
|-------|------|
| [The 12 Worst Designed Pokemon](Video%20Game%20Reviews/Pokemon/The%2012%20Worst%20Designed%20Pokemon.md) | #gaming #critique |

---

## 📋 Reports

**Category:** Formal reports and reviews

| Story | Tags | Type |
|-------|------|------|
| [Book Review Brisingr](Reports/Book%20Review%20Brisingr.md) | #literature #review | Book Review |
| [Geomorphic Hazards - Afghanistan 2022 Earthquake](Reports/Geomorphic%20Hazards%20-%20Afghanistan%202022%20Earthquake.md) | #geography #science | Report |
| [Van Gogh Alive Review](Reports/Van%20Gogh%20Alive%20Review.md) | #art #review | Review |

---

## ✨ Write 4 Fun

**Category:** Creative writing for enjoyment

### 2021 Short Stories

| Story | Tags |
|-------|------|
| [The Abduction](Write%204%20Fun/2021/Short%20Story/The%20Abduction.md) | #sci-fi #adventure |
| [The 4th Dimension Adventure](Write%204%20Fun/2021/Short%20Story/The%204th%20Dimension%20Adventure.md) | #sci-fi #adventure |
| [Grandma's Attic](Write%204%20Fun/2021/Short%20Story/Grandma's%20Attic.md) | #mystery #family |
| [A Leap of Faith](Write%204%20Fun/2021/Short%20Story/A%20Leap%20of%20Faith.md) | #adventure #personal |

### 2021 Poetry

| Story | Tags |
|-------|------|
| [Natural Terror](Write%204%20Fun/2021/Poetry/Natural%20Teror.md) | #nature #emotion |
| [A Dog](Write%204%20Fun/2021/Poetry/A%20Dog.md) | #animals #poetry |

---

## 📊 Statistics

- **Total Stories:** 142+ files
- **Main Categories:** 10
- **Auto-Updates:** Regenerate with `npx ts-node genStoryDatabase.ts`

---

## 🤖 How to Auto-Update

**When new stories are added:**
```bash
npx ts-node genStoryDatabase.ts
```

This script will:
✅ Scan all story directories  
✅ Extract metadata (tags, types)  
✅ Regenerate the database automatically  
✅ Update category counts and statistics  

---

<script>
let selectedTags = [];
let selectedCategory = null;

function filterStories(category) {
  selectedCategory = category === 'all' ? null : category;
  applyFilters();
}

function toggleTag(tag) {
  const idx = selectedTags.indexOf(tag);
  if (idx > -1) {
    selectedTags.splice(idx, 1);
  } else {
    selectedTags.push(tag);
  }
  applyFilters();
  updateTagButtons();
}

function updateTagButtons() {
  document.querySelectorAll('.tag-btn').forEach(btn => {
    if (selectedTags.includes(btn.dataset.tag)) {
      btn.style.background = '#4CAF50';
      btn.style.color = 'white';
    } else {
      btn.style.background = '';
      btn.style.color = '';
    }
  });
}

function clearFilters() {
  selectedTags = [];
  selectedCategory = null;
  document.getElementById('searchInput').value = '';
  applyFilters();
  updateTagButtons();
}

function searchStories() {
  applyFilters();
}

function applyFilters() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  // Get all story rows
  const tables = document.querySelectorAll('table');
  let visibleCount = 0;
  
  tables.forEach(table => {
    const rows = table.querySelectorAll('tbody tr');
    const header = table.previousElementSibling;
    let categoryVisible = false;
    
    rows.forEach(row => {
      const storyText = row.textContent.toLowerCase();
      const storyHTML = row.innerHTML.toLowerCase();
      
      // Check category filter
      const categoryMatch = !selectedCategory || 
        (header && header.textContent.toLowerCase().includes(selectedCategory.toLowerCase()));
      
      // Check tag filter
      const tagMatch = selectedTags.length === 0 || 
        selectedTags.some(tag => storyHTML.includes(tag.toLowerCase()));
      
      // Check search filter
      const searchMatch = !searchTerm || 
        storyText.includes(searchTerm);
      
      const shouldShow = categoryMatch && tagMatch && searchMatch;
      row.style.display = shouldShow ? '' : 'none';
      
      if (shouldShow) {
        categoryVisible = true;
        visibleCount++;
      }
    });
    
    // Hide table if no rows visible
    if (rows.length > 0) {
      table.style.display = categoryVisible ? '' : 'none';
      if (table.previousElementSibling && table.previousElementSibling.tagName === 'H2') {
        table.previousElementSibling.style.display = categoryVisible ? '' : 'none';
      }
      if (table.previousElementSibling?.previousElementSibling?.tagName === 'CODE') {
        table.previousElementSibling.previousElementSibling.style.display = categoryVisible ? '' : 'none';
      }
    }
  });
}
</script>

<style>
#filterContainer {
  border: 2px solid #e0e0e0;
}

.filter-btn, .tag-btn {
  padding: 8px 14px;
  margin: 4px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
}

.filter-btn:hover {
  background: #f0f0f0;
  border-color: #999;
  transform: scale(1.05);
}

.tag-btn:hover {
  background: #e8f5e9;
  border-color: #66BB6A;
}

#searchInput {
  font-family: inherit;
  box-sizing: border-box;
}

#searchInput:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}
</style>
