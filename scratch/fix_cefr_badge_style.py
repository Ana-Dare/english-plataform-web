import re

filepath = 'src/pages/TeacherDashboard/Classes/classDetail.styles.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const CefrBadge = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #3b82f6;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;""",
"""export const CefrBadge = styled.span`
  padding: 0.15rem 0.6rem;
  border-radius: 6px;
  background: #3b82f6;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated CefrBadge style")
