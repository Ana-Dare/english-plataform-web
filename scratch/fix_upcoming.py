import re

filepath = 'src/pages/TeacherDashboard/Agenda/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const UpcomingContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(31, 43, 69, 0.05);
  height: max-content;
`;""",
"""export const UpcomingContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(31, 43, 69, 0.05);
  height: max-content;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("UpcomingContainer fixed")
