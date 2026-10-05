import re

with open('src/pages/StudentDashboard/Certificados/viewerStyle.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Keep only the first occurrence of each export
seen = set()
lines = content.split('\n')
new_lines = []
skip = False

for line in lines:
    match = re.match(r'export const (\w+) =', line)
    if match:
        name = match.group(1)
        if name in seen:
            skip = True
        else:
            seen.add(name)
            skip = False
    
    if not skip:
        new_lines.append(line)

with open('src/pages/StudentDashboard/Certificados/viewerStyle.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))
