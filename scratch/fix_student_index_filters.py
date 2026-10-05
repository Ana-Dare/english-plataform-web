import re

filepath = 'src/pages/TeacherDashboard/Students/index.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""import {
  AddButton,
  Avatar,
  Container,""",
"""import {
  AddButton,
  Avatar,
  Container,
  FiltersContainer,"""
)

content = content.replace(
"""          <div
            style={{
              display: "flex",
              gap: "0.8rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >""",
"""          <FiltersContainer>"""
)

content = content.replace(
"""              Adicionar aluno <Plus size={18} />
            </AddButton>
          </div>
        </HeaderActions>""",
"""              Adicionar aluno <Plus size={18} />
            </AddButton>
          </FiltersContainer>
        </HeaderActions>"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced inline filters div with FiltersContainer")
