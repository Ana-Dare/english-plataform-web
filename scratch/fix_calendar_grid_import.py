import re

filepath = 'src/pages/TeacherDashboard/Agenda/CalendarGrid.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""import {
  CalendarGridContainer,
  WeekDayHeader,
  DayCell,
  DayNumber,
  EventChip,
} from "./style";""",
"""import {
  CalendarGridContainer,
  WeekDayHeader,
  DayCell,
  DayNumber,
  EventChip,
  ScrollWrapper
} from "./style";"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Imported ScrollWrapper in CalendarGrid.tsx")
