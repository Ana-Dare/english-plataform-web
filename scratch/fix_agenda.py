import re

filepath = 'src/pages/TeacherDashboard/Agenda/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix AgendaContainer
content = content.replace(
"""export const AgendaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(31, 43, 69, 0.05);
  padding: 1.5rem;
`;""",
"""export const AgendaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(31, 43, 69, 0.05);
  padding: 1.5rem;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;"""
)

# Fix SearchWrapper width on mobile
content = content.replace(
"""export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  flex: 1;
  min-width: 200px;
  max-width: 320px;
  border: 1px solid #1F2B45;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.05);""",
"""export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  flex: 1;
  min-width: 200px;
  max-width: 320px;
  border: 1px solid #1F2B45;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.05);

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }"""
)

# Fix CalendarGridContainer scroll
content = content.replace(
"""export const CalendarGridContainer = styled.div<{ $isWeekly?: boolean }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: rgba(31, 43, 69, 0.08);
  border: 1px solid rgba(31, 43, 69, 0.08);
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 600px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 8px;
    padding-bottom: 8px;
    min-width: 100%;
    
    > div {
      min-width: 50px;
    }
  }
`;""",
"""export const CalendarGridContainer = styled.div<{ $isWeekly?: boolean }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: rgba(31, 43, 69, 0.08);
  border: 1px solid rgba(31, 43, 69, 0.08);
  border-radius: 12px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    min-width: 600px; /* Force minimum width to enable scrolling */
    border-radius: 8px;
    padding-bottom: 8px;
  }
`;

export const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  /* Scrollbar styles for calendar */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #F1F5F9;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 4px;
  }
`;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Agenda styles fixed for mobile.")
