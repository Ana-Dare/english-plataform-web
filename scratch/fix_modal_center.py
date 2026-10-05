import re

filepath = 'src/pages/TeacherDashboard/Agenda/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(31, 43, 69, 0.35);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;

  @media (max-width: 600px) {
    align-items: flex-end;
    padding: 0;
  }
`;""",
"""export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(31, 43, 69, 0.35);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;

  @media (max-width: 600px) {
    align-items: center;
    padding: 1rem;
  }
`;"""
)

content = content.replace(
"""export const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  max-height: 92vh;
  padding: 0;
  box-shadow: 0 15px 50px rgba(31, 43, 69, 0.15);
  display: flex;
  flex-direction: column;
  border: 1.5px solid #c4c4c4;
  overflow: hidden;

  @media (max-width: 600px) {
    max-width: 100%;
    max-height: 94vh;
    border-radius: 16px 16px 0 0;
    border-bottom: none;
  }
`;""",
"""export const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  max-height: 92vh;
  padding: 0;
  box-shadow: 0 15px 50px rgba(31, 43, 69, 0.15);
  display: flex;
  flex-direction: column;
  border: 1.5px solid #c4c4c4;
  overflow: hidden;

  @media (max-width: 600px) {
    max-width: 100%;
    max-height: 94vh;
    border-radius: 16px;
  }
`;"""
)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ModalOverlay and ModalContent")
