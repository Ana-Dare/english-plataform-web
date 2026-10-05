import re

filepath = 'src/pages/TeacherDashboard/Agenda/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const UpcomingContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid rgba(31, 43, 69, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: fit-content;
`;""",
"""export const UpcomingContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid rgba(31, 43, 69, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: fit-content;
  min-width: 0;
`;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added min-width: 0 to UpcomingContainer")
