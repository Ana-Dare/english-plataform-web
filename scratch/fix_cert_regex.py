import re

filepath = 'src/pages/TeacherDashboard/Certificates/index.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add ActionButtonsWrapper to imports
import_replace = """  MaterialMeta,
} from "./style";"""

import_with = """  MaterialMeta,
  ActionButtonsWrapper,
} from "./style";"""

if "ActionButtonsWrapper" not in content:
    content = content.replace(import_replace, import_with)

# Replace the div
# Let's use regex to replace the exact div style
pattern = re.compile(r'<div\s+style=\{\{\s*display:\s*"flex",\s*justifyContent:\s*"center",\s*gap:\s*"1\.5rem",\s*marginTop:\s*"1\.5rem",?\s*\}\}\s*>(.*?)</div>\s*</DetailContainer>', re.DOTALL)

def replacer(match):
    return f"<ActionButtonsWrapper>{match.group(1)}</ActionButtonsWrapper>\n          </DetailContainer>"

new_content = pattern.sub(replacer, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replaced div with ActionButtonsWrapper")
