import re

filepath = 'src/pages/TeacherDashboard/Classes/classDetail.styles.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const WorkspaceBody = styled.div`
  padding: 1.75rem;
  background: #fff;
  flex: 1;""",
"""export const WorkspaceBody = styled.div`
  padding: 1.75rem;
  background: #fff;
  flex: 1;
  width: 100%;
  box-sizing: border-box;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed WorkspaceBody width")
