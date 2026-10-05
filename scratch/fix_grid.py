import re

filepath = 'src/pages/TeacherDashboard/Agenda/CalendarGrid.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""import {
  CalendarGridContainer,
  WeekDayHeader,
  DayCell,
  EventChip
} from './style';""",
"""import {
  CalendarGridContainer,
  WeekDayHeader,
  DayCell,
  EventChip,
  ScrollWrapper
} from './style';"""
)

content = content.replace(
"""  return (
    <CalendarGridContainer $isWeekly={viewMode === 'semanal'}>""",
"""  return (
    <ScrollWrapper>
      <CalendarGridContainer $isWeekly={viewMode === 'semanal'}>"""
)

content = content.replace(
"""    </CalendarGridContainer>
  );""",
"""    </CalendarGridContainer>
    </ScrollWrapper>
  );"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("CalendarGrid wrapped with ScrollWrapper")
