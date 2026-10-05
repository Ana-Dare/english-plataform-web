import re

filepath = 'src/pages/StudentDashboard/Turma/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Banner padding and title size on mobile
content = content.replace(
"""export const Banner = styled.div`
  background-color: #1F2B45;
  border-radius: 12px;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    color: white;
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0;
  }
`;""",
"""export const Banner = styled.div`
  background-color: #1F2B45;
  border-radius: 12px;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }

  h2 {
    color: white;
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0;
    word-break: break-word;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;"""
)

# Fix TabsList gap and min-width
content = content.replace(
"""export const TabsList = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 0;
  overflow-x: auto;
  
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
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  &::-webkit-scrollbar {
    display: none;
  }
`;"""
)

# Fix ContentArea padding
content = content.replace(
"""export const ContentArea = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
  border: 1px solid #f2f2f2;
`;""",
"""export const ContentArea = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
  border: 1px solid #f2f2f2;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;"""
)

# Fix SectionHeader flex-wrap
content = content.replace(
"""export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h3 {
    font-size: 1.3rem;
    font-weight: 800;
    color: #1F2B45;
    margin: 0;
  }

  .right-action {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #666;
  }
`;""",
"""export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 800;
    color: #1F2B45;
    margin: 0;
  }

  .right-action {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #666;
    flex-wrap: wrap;
  }
`;"""
)

# Fix MessageCard author-row
content = content.replace(
"""  .author-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
  }""",
"""  .author-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
    flex-wrap: wrap;
    padding-right: 20px;
  }"""
)

# Fix MaterialCard text overflow
content = content.replace(
"""  .file-info {
    h5 {
      font-size: 1rem;
      font-weight: 800;
      color: #1F2B45;
      margin: 0 0 4px 0;
    }
    p {
      font-size: 0.85rem;
      color: #888;
      font-weight: 500;
      margin: 0;
    }
  }""",
"""  .file-info {
    max-width: 100%;
    overflow: hidden;
    
    h5 {
      font-size: 1rem;
      font-weight: 800;
      color: #1F2B45;
      margin: 0 0 4px 0;
      word-break: break-word;
    }
    p {
      font-size: 0.85rem;
      color: #888;
      font-weight: 500;
      margin: 0;
    }
  }"""
)

# Fix TurmaContainer
content = content.replace(
"""export const TurmaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
`;""",
"""export const TurmaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated style.ts for Turma mobile responsiveness")
