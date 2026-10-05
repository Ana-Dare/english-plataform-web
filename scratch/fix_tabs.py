import re

filepath = 'src/pages/StudentDashboard/Turma/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const TabsList = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 0;
  overflow-x: auto;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  &::-webkit-scrollbar {
    display: none;
  }
`;""",
"""export const TabsList = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 0;
  overflow-x: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  
  @media (max-width: 768px) {
    gap: 20px;
    padding-bottom: 8px;
  }
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #F8FAFC;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 4px;
  }
`;"""
)

content = content.replace(
"""export const TabItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 0 0 16px 0;
  font-size: 0.95rem;
  font-weight: 800;
  color: ${({ $active }) => ($active ? '#1F2B45' : '#888')};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;""",
"""export const TabItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 0 0 16px 0;
  font-size: 0.95rem;
  font-weight: 800;
  color: ${({ $active }) => ($active ? '#1F2B45' : '#888')};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  flex-shrink: 0;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed TabsList and TabItem")
