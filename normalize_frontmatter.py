import re, datetime
from pathlib import Path
import yaml

def fmt_date(dt):
    return dt.strftime('%A, %B %d %Y, %I:%M:%S %p')

root = Path('content')
md_files = list(root.rglob('*.md'))
count = 0
for p in md_files:
    text = p.read_text(encoding='utf-8')
    if text.startswith('---'):
        m = re.match(r'^(---\s*\n)(.*?\n)(---\s*\n)', text, flags=re.S)
        if not m:
            continue
        block = m.group(2)
        existing = yaml.safe_load(block) or {}
        if not isinstance(existing, dict):
            existing = {}
        title = existing.get('title') or p.stem
        draft = existing.get('draft', False)
        tags = existing.get('tags')
        if tags is None or tags == '':
            tags = []
        elif isinstance(tags, str):
            tags = [t.strip() for t in tags.split(',') if t.strip()]
        comments = existing.get('comments', True)
        author = existing.get('author')
        creation_date = existing.get('creation_date') or fmt_date(datetime.datetime.now())
        last_edit_date = existing.get('last_edit_date') or creation_date
        canonical = {
            'title': title,
            'draft': bool(draft),
            'tags': tags,
            'comments': bool(comments),
        }
        if author not in (None, '', []):
            canonical['author'] = author
        canonical['creation_date'] = creation_date
        canonical['last_edit_date'] = last_edit_date
        for k, v in existing.items():
            if k in canonical or v is None or v == '':
                continue
            canonical[k] = v
        yaml_text = yaml.safe_dump(canonical, sort_keys=False, allow_unicode=True)
        new = '---\n' + yaml_text.strip() + '\n---\n'
        rest = text[m.end():]
        p.write_text(new + rest, encoding='utf-8')
        count += 1
    else:
        title = p.stem
        canonical = {
            'title': title,
            'draft': False,
            'tags': [],
            'comments': True,
            'creation_date': fmt_date(datetime.datetime.now()),
            'last_edit_date': fmt_date(datetime.datetime.now()),
        }
        yaml_text = yaml.safe_dump(canonical, sort_keys=False, allow_unicode=True)
        p.write_text('---\n' + yaml_text.strip() + '\n---\n\n' + text, encoding='utf-8')
        count += 1
print(f'Processed {count} markdown files')
