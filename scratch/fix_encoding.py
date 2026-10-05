import os

replacements = {
    "Ã¡": "á", "Ã©": "é", "Ã­": "í", "Ã³": "ó", "Ãº": "ú",
    "ÃÁ": "Á", "ÃÉ": "É", "ÃÍ": "Í", "ÃÓ": "Ó", "ÃÚ": "Ú",
    "Ã¢": "â", "Ãª": "ê", "Ã®": "î", "Ã´": "ô", "Ã»": "û",
    "Ã£": "ã", "Ãµ": "õ", "Ã±": "ñ",
    "Ã§": "ç", "ÃÇ": "Ç",
    "Ã€": "À", "Ã¨": "è", "Ã¬": "ì", "Ã²": "ò", "Ã¹": "ù",
    "â€“": "–", "â€”": "—", "â€œ": '“', "â€": '”', "â€˜": '‘', "â€™": '’',
    "Âº": "º", "Âª": "ª"
}

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            with open(filepath, 'r', encoding='utf-16') as f:
                content = f.read()
        except:
            return
    
    new_content = content
    for mangled, fixed in replacements.items():
        new_content = new_content.replace(mangled, fixed)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.html', '.json', '.js', '.jsx')):
            fix_file(os.path.join(root, file))
