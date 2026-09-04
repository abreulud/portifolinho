from docx import Document

path = r"C:\Users\Ludmilla\Downloads\Projeto Usinas de Geração de Energia.docx"
doc = Document(path)

for index, paragraph in enumerate(doc.paragraphs):
    num = paragraph._p.pPr.numPr if paragraph._p.pPr is not None else None
    run_info = []
    for run in paragraph.runs:
        size = run.font.size.pt if run.font.size else None
        run_info.append(
            f"{run.text!r}[b={run.bold},i={run.italic},sz={size},fn={run.font.name}]"
        )
    print(
        f"{index:02d} style={paragraph.style.name!r} num={bool(num)} "
        f"text={paragraph.text!r} runs={' | '.join(run_info)}"
    )

print("\nSTYLES")
for style_name in ("normal", "Heading 3", "Heading 4"):
    style = doc.styles[style_name]
    font = style.font
    fmt = style.paragraph_format
    color = font.color.rgb if font.color and font.color.rgb else None
    print(
        style_name,
        "font=", font.name,
        "size=", font.size.pt if font.size else None,
        "bold=", font.bold,
        "color=", color,
        "before=", fmt.space_before.pt if fmt.space_before else None,
        "after=", fmt.space_after.pt if fmt.space_after else None,
        "line=", fmt.line_spacing,
    )
