import re

with open('src/pages/TeacherDashboard/Students/style.ts', 'r', encoding='utf-8') as f:
    lines = f.read()

# We want to remove the block of dummy styled components I added earlier:
# export const InputGroup = styled.div`display: flex...`
# export const Input = styled.input``;
# export const RegisterContainer = styled.div``;
# ... etc.

# Let's just find and remove the exact exact empty exports I added.
dummy_exports = [
    "export const InputGroup = styled.div`display: flex; flex-direction: column; gap: 4px;`;",
    "export const Input = styled.input``;",
    "export const RegisterContainer = styled.div``;",
    "export const RegisterHeader = styled.div``;",
    "export const RegisterHeaderLeft = styled.div``;",
    "export const RegisterBody = styled.div``;",
    "export const RegisterFooter = styled.div``;",
    "export const RegisterField = styled.div``;",
    "export const PlanCard = styled.div<{ $active: boolean }>``;",
    "export const PlanCheck = styled.div``;",
    "export const RegisterGrid = styled.div``;",
    "export const PlanSelector = styled.div``;",
    "export const RegisterInput = styled.input``;",
    "export const RegisterLabel = styled.label``;",
    "export const RegisterSection = styled.div``;",
    "export const RegisterSectionTitle = styled.h3``;",
    "export const InputIcon = styled.div``;",
    "export const InputError = styled.span``;",
    "export const CheckboxGroup = styled.div``;",
    "export const CheckboxLabel = styled.label``;",
    "export const RegisterTextarea = styled.textarea``;",
    "export const FieldError = styled.span`color: #EF4444; font-size: 0.8rem; margin-top: 4px; display: block;`;"
]

for d in dummy_exports:
    lines = lines.replace(d, "")

with open('src/pages/TeacherDashboard/Students/style.ts', 'w', encoding='utf-8') as f:
    f.write(lines)
