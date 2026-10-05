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
  
  /* Esconde a scrollbar feia nos navegadores mas mantm o scroll por toque */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  @media (max-width: 768px) {
    gap: 20px;
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
  
  /* Custom subtle scrollbar */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
    padding-bottom: 4px;
  }
`;"""
)

# In case encoding was an issue with the comment:
content = re.sub(
r"""export const TabsList = styled\.div`.*?@media \(max-width: 768px\) \{.*?\}
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
  
  /* Custom subtle scrollbar */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
    padding-bottom: 4px;
  }
`;""", content, flags=re.DOTALL)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated TabsList scrollbar in StudentDashboard")
