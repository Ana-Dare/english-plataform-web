import re

filepath = 'src/pages/StudentDashboard/Turma/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""  /* Custom subtle scrollbar */
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
  }""",
"""  /* Custom subtle scrollbar */
  &::-webkit-scrollbar {
    height: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(31, 43, 69, 0.15);
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
    padding-bottom: 0;
    margin-bottom: 4px;
  }"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated TabsList scrollbar style to be transparent track")
