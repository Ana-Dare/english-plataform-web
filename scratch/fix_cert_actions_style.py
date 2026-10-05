import re

filepath = 'src/pages/TeacherDashboard/Certificates/style.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export const SendCertificateBtn = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #1f2b45;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(31, 43, 69, 0.15);
  margin-top: 1rem;

  &:hover {
    background: #141d2e;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(31, 43, 69, 0.2);
  }
`;""",
"""export const SendCertificateBtn = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #1f2b45;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(31, 43, 69, 0.15);
  margin-top: 1rem;

  &:hover {
    background: #141d2e;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(31, 43, 69, 0.2);
  }
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;

    button {
      width: 100%;
      justify-content: center;
      margin-top: 0;
    }
  }
`;"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added ActionButtonsWrapper to style.ts")
