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
  
  /* Esconde a scrollbar feia nos navegadores mas mantém o scroll por toque */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  @media (max-width: 768px) {
    gap: 20px;
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
  white-space: nowrap;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }""",
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
  flex-shrink: 0;
  transition: color 0.2s;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0 0 12px 0;
    gap: 6px;
  }

  svg {
    width: 18px;
    height: 18px;
    
    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
  }"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed ugly scrollbar and adjusted mobile tab styling")
