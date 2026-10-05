import re

filepath = 'src/pages/TeacherDashboard/Students/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# TableContainer
content = content.replace(
"""export const TableContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow-x: auto;
  border: 1px solid #F1F5F9;
`;""",
"""export const TableContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow-x: auto;
  border: 1px solid #F1F5F9;

  @media (max-width: 768px) {
    border: none;
    background: transparent;
    box-shadow: none;
    overflow-x: hidden;
  }
`;"""
)

# Table
content = content.replace(
"""export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
  font-family: 'Rubik', sans-serif;
`;""",
"""export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
  font-family: 'Rubik', sans-serif;

  @media (max-width: 768px) {
    display: block;
    min-width: 100%;

    thead {
      display: none;
    }

    tbody {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }
  }
`;"""
)

# Tr
content = content.replace(
"""export const Tr = styled.tr`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: #FEF6F5;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(197, 122, 103, 0.12);
    position: relative;
    z-index: 10;

    td {
      border-bottom-color: transparent;
    }
  }
`;""",
"""export const Tr = styled.tr`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: #FEF6F5;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(197, 122, 103, 0.12);
    position: relative;
    z-index: 10;

    td {
      border-bottom-color: transparent;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 16px;
    border-radius: 16px;
    border: 1px solid #E2E8F0;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(197, 122, 103, 0.15);
      border-color: #C57A67;
    }
  }
`;"""
)

# Td
content = content.replace(
"""export const Td = styled.td`
  padding: 24px 20px;
  font-size: 0.95rem;
  color: #475569;
  border-bottom: 1px solid #E2E8F0;
  font-weight: 400;
  vertical-align: middle;
  transition: border-color 0.3s ease;
`;""",
"""export const Td = styled.td`
  padding: 24px 20px;
  font-size: 0.95rem;
  color: #475569;
  border-bottom: 1px solid #E2E8F0;
  font-weight: 400;
  vertical-align: middle;
  transition: border-color 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    border: none;
    width: 100%;

    &::before {
      content: attr(data-label);
      font-weight: 700;
      font-size: 0.75rem;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    > div, > span {
      text-align: right;
    }
  }
`;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated style.ts")
