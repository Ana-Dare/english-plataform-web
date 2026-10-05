import re

filepath = 'src/interfaces/students.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""export interface UpdateStudentParams {
  name?: string;
  email?: string;
  cpf_hash?: string;
  phone?: string | null;
  birthdate?: string | null;
  level_id?: number | null;
  vip?: 0 | 1;
  notes?: string;
  class_id?: number | null;
}""",
"""export interface UpdateStudentParams {
  name?: string;
  email?: string;
  cpf_hash?: string;
  phone?: string | null;
  birthdate?: string | null;
  level_id?: number | null;
  vip?: 0 | 1;
  active?: 0 | 1;
  notes?: string;
  class_id?: number | null;
}"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated UpdateStudentParams to include active")
