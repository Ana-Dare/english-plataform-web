import re

filepath = 'src/pages/StudentDashboard/Turma/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
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
  }""",
"""  /* Custom subtle scrollbar */
  &::-webkit-scrollbar {
    height: 2px;
  }
  &::-webkit-scrollbar-track {
    background: #E2E8F0;
  }
  &::-webkit-scrollbar-thumb {
    background: #1F2B45;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
    border-bottom: none;
  }"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Merged border and scrollbar into one line")
