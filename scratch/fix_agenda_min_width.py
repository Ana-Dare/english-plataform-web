import re

filepath = 'src/pages/TeacherDashboard/Agenda/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const AgendaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background: #fff;""",
"""export const AgendaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  min-width: 0;
  background: #fff;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added min-width: 0 to AgendaContainer")
