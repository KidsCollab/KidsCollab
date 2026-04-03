find content -type f -name "*.md" | while read f; do
  dir=$(basename $(dirname "$f"))
  file=$(basename "$f" .md)
  if [ "$dir" = "$file" ]; then
    echo "$f"
  fi
done