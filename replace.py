import re

with open('src/pages/TeacherDashboard/Students/style.ts', 'r', encoding='utf-8') as f:
    content = f.read()

new_styles = """export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 24px;
  padding: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 24px 20px;
    gap: 24px;
  }
`;

export const DetailField = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;

  .field-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #F8FAFC;
    color: #64748B;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid #E2E8F0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }

  .field-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    min-width: 0;

    input, select, textarea {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid #E2E8F0;
      border-radius: 10px;
      font-family: 'Rubik', sans-serif;
      font-size: 0.95rem;
      color: #1E293B;
      background: #F8FAFC;
      outline: none;
      transition: all 0.2s ease;

      &:focus {
        background: #fff;
        border-color: #C57A67;
        box-shadow: 0 0 0 4px rgba(197,122,103,0.1);
      }
      
      &:hover:not(:focus) {
        border-color: #CBD5E1;
      }
    }

    textarea {
      min-height: 100px;
      resize: vertical;
      line-height: 1.5;
    }
  }
`;"""

# Replace DetailGrid and DetailField in the content
content = re.sub(r'export const DetailGrid = styled\.div`.*?export const DetailFieldLabel =', new_styles + '\n\nexport const DetailFieldLabel =', content, flags=re.DOTALL)

with open('src/pages/TeacherDashboard/Students/style.ts', 'w', encoding='utf-8') as f:
    f.write(content)
