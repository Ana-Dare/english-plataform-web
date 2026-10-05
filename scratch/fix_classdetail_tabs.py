import re

filepath = 'src/pages/TeacherDashboard/Classes/classDetail.styles.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const TabsBar = styled.div`
  display: flex;
  gap: 0.2rem 1.35rem;
  padding: 0.15rem 1.75rem 0;
  overflow-x: auto;
  scrollbar-width: none;""",
"""export const TabsBar = styled.div`
  display: flex;
  gap: 0.2rem 1.35rem;
  padding: 0.15rem 1.75rem 0;
  overflow-x: auto;
  scrollbar-width: none;
  width: 100%;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;"""
)

content = content.replace(
"""export const ClassWorkspace = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(31, 43, 69, 0.08);
  min-height: calc(100vh - 140px);
`;""",
"""export const ClassWorkspace = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(31, 43, 69, 0.08);
  min-height: calc(100vh - 140px);
  width: 100%;
  box-sizing: border-box;
`;"""
)

content = content.replace(
"""export const ClassBanner = styled.div`
  background: #1f2b45;
  color: #fff;
  padding: 1.5rem 1.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;""",
"""export const ClassBanner = styled.div`
  background: #1f2b45;
  color: #fff;
  padding: 1.5rem 1.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
  box-sizing: border-box;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed TabsBar width and overflow on ClassDetail")
