from pathlib import Path
from PIL import Image, ImageDraw

source = Path(r"C:\Users\Ludmilla\Documents\WebsitePortifolio\tmp\referencia_plano")
pages = sorted(source.glob("pagina-*.png"))
thumb_w, thumb_h = 620, 877
gap = 28
label_h = 34

for sheet_index in range(0, len(pages), 4):
    batch = pages[sheet_index:sheet_index + 4]
    canvas = Image.new("RGB", (thumb_w * 2 + gap * 3, (thumb_h + label_h) * 2 + gap * 3), "#d9dde3")
    draw = ImageDraw.Draw(canvas)
    for offset, page_path in enumerate(batch):
        image = Image.open(page_path).convert("RGB")
        image.thumbnail((thumb_w, thumb_h))
        col, row = offset % 2, offset // 2
        x = gap + col * (thumb_w + gap)
        y = gap + row * (thumb_h + label_h + gap)
        canvas.paste(image, (x, y + label_h))
        draw.text((x, y + 6), page_path.stem.replace("pagina-", "Página "), fill="#202124")
    output = source / f"contato-{sheet_index // 4 + 1}.png"
    canvas.save(output, quality=95)
    print(output)
