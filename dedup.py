import re

with open('src/pages/TeacherDashboard/Students/style.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Pattern to find export const NAME
pattern = re.compile(r'^export const (\w+) =', re.MULTILINE)

seen = set()
new_lines = []

# Split by `export const `
chunks = re.split(r'^(?=export const )', text, flags=re.MULTILINE)

for chunk in chunks:
    match = pattern.search(chunk)
    if match:
        name = match.group(1)
        if name in seen:
            continue # skip duplicate
        seen.add(name)
    new_lines.append(chunk)

with open('src/pages/TeacherDashboard/Students/style.ts', 'w', encoding='utf-8') as f:
    f.write("".join(new_lines))
