import re

filepath = 'src/pages/TeacherDashboard/Classes/ClassDetail.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""                <SoftBadge>Intermediate</SoftBadge>
                <CefrBadge>{cefr}</CefrBadge>
                <ExtraBadge>+</ExtraBadge>""",
"""                <SoftBadge>Intermediate</SoftBadge>
                <CefrBadge>Nível {cefr}</CefrBadge>"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ClassDetail badges")
