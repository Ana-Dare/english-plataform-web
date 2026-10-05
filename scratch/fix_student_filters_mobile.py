import re

filepath = 'src/pages/TeacherDashboard/Students/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add FiltersContainer
content = content.replace(
"""export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;""",
"""export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    
    > div {
      width: 100%;
    }

    > button:last-child {
      grid-column: span 2;
      width: 100%;
      justify-content: center;
    }
  }
`;"""
)

# Improve Table mobile styles
content = content.replace(
"""    tbody {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }
  }
`;""",
"""    tbody {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }
  }
`;"""
)

content = content.replace(
"""export const Td = styled.td`
  padding: 20px 24px;
  border-bottom: 1px solid #F1F5F9;
  color: #475569;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: none;

    &::before {
      content: attr(data-label);
      font-weight: 700;
      color: #94A3B8;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
`;""",
"""export const Td = styled.td`
  padding: 20px 24px;
  border-bottom: 1px solid #F1F5F9;
  color: #475569;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px dashed #F1F5F9;

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: attr(data-label);
      font-weight: 700;
      color: #94A3B8;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Make the Nome row look like a prominent card header */
    &:first-child {
      justify-content: flex-start;
      gap: 12px;
      padding-bottom: 16px;
      border-bottom: 1px solid #E2E8F0;
      margin-bottom: 8px;
    }

    &:first-child::before {
      display: none;
    }
  }
`;"""
)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated TeacherDashboard/Students/style.ts")
