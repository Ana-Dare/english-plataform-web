import re

filepath = 'src/pages/TeacherDashboard/Agenda/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  flex: 1;
  min-width: 200px;
  max-width: 320px;
  border: 1px solid #1F2B45;""",
"""export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  flex: 1;
  min-width: 200px;
  max-width: 320px;
  border: 1px solid #1F2B45;
  box-sizing: border-box;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added box-sizing: border-box to SearchWrapper")
