import re

filepath = 'src/pages/TeacherDashboard/Classes/classDetail.styles.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const HistoryWrap = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #eef1f6;
`;""",
"""export const HistoryWrap = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #eef1f6;
  width: 100%;
  box-sizing: border-box;
`;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed HistoryWrap width on ClassDetail")
