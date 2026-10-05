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
  scrollbar-width: none;
  width: 100%;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 640px) {
    padding: 0.1rem 1rem 0;
    gap: 0.15rem 0.9rem;
  }
`;""",
"""export const TabsBar = styled.div`
  display: flex;
  gap: 0.2rem 1.35rem;
  padding: 0.15rem 1.75rem 0;
  overflow-x: auto;
  width: 100%;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  /* Custom subtle scrollbar */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  @media (max-width: 640px) {
    /* Expand beyond parent padding to allow edge-to-edge scrolling */
    width: calc(100% + 2rem);
    margin-left: -1rem;
    padding: 0.1rem 1rem 4px 1rem;
    gap: 0.15rem 0.9rem;
  }
`;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added visible scrollbar and edge-to-edge scroll for TabsBar")
