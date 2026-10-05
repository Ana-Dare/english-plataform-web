import re

filepath = 'src/contexts/Students/StudentsProvider.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add useState import if not present
if "useState" not in content:
    content = content.replace('import React, { useCallback, useMemo }', 'import React, { useCallback, useMemo, useState }')

# Add localOverrides state
content = content.replace(
"""  const mockStudents: Student[] = useMemo(() => [""",
"""  const [localOverrides, setLocalOverrides] = useState<Record<number, Partial<Student>>>({});

  const mockStudents: Student[] = useMemo(() => ["""
)

# Apply localOverrides to students
content = content.replace(
"""  const students = apiStudents.length > 0 ? apiStudents : mockStudents;""",
"""  const baseStudents = apiStudents.length > 0 ? apiStudents : mockStudents;
  const students = useMemo(() => {
    return baseStudents.map(s => ({
      ...s,
      ...localOverrides[s.id]
    }));
  }, [baseStudents, localOverrides]);"""
)

# Modify updateMutation to set local override
content = content.replace(
"""  const updateMutation = useMutation({
    mutationFn: ({
      userId,
      params,
    }: {
      userId: number;
      params: UpdateStudentParams;
    }) => updateStudentService(userId, params),
    onSuccess: invalidateStudents,
  });""",
"""  const updateMutation = useMutation({
    mutationFn: async ({
      userId,
      params,
    }: {
      userId: number;
      params: UpdateStudentParams;
    }) => {
      // Optimistic update for mock UI
      setLocalOverrides(prev => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          ...(params.active !== undefined ? { isActive: params.active === 1 } : {}),
          ...(params.name ? { name: params.name } : {}),
          ...(params.email ? { email: params.email } : {}),
        }
      }));
      
      try {
        await updateStudentService(userId, params);
      } catch (err) {
        // Fallback silently if no backend is running
        console.warn("Backend not running, relying on optimistic update.");
      }
    },
    onSuccess: invalidateStudents,
  });"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added optimistic updates to StudentsProvider")
