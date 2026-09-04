from pypdf import PdfReader
from collections import Counter
import pdfplumber

reader = PdfReader(r"C:\Users\Ludmilla\Downloads\0. Plano.pdf")
fonts = set()
for page in reader.pages:
    resources = page.get("/Resources") or {}
    font_map = resources.get("/Font") or {}
    for key, value in font_map.items():
        obj = value.get_object()
        fonts.add((str(key), str(obj.get("/BaseFont")), str(obj.get("/Subtype"))))

for item in sorted(fonts):
    print(item)

print("\nFONT/SIZE COUNTS")
with pdfplumber.open(r"C:\Users\Ludmilla\Downloads\0. Plano.pdf") as pdf:
    counts = Counter()
    for page in pdf.pages:
        for char in page.chars:
            if str(char.get("text", "")).strip():
                counts[(char.get("fontname"), round(float(char.get("size", 0)), 1))] += 1
    for key, count in counts.most_common():
        print(key, count)

    print("\nPAGE 1 LINES")
    words = pdf.pages[0].extract_words(extra_attrs=["fontname", "size"])
    for word in words[:120]:
        print(word["text"], word["fontname"], round(float(word["size"]), 1), round(float(word["x0"]), 1), round(float(word["top"]), 1))
