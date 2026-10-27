from pathlib import Path

import fitz


ROOT = Path("attached_assets")
OUT = Path(".agents/outputs/pdf-reference")
OUT.mkdir(parents=True, exist_ok=True)

files = [
    ROOT / "Cards_initiative_(1)_1793098094045.pdf",
    ROOT / "The_Daily_Star_-_Money_Sense_-_Partnership_Proposal_1793098139228.pdf",
]

for file_path in files:
    doc = fitz.open(file_path)
    print(f"{file_path.name}: {len(doc)} pages")
    chosen = set(range(min(2, len(doc))))
    keywords = (
        "platform design",
        "suitable card finder",
        "the core feature",
        "offer radar",
        "editorial independence",
        "money sense",
        "partnership tiers",
    )
    for index, page in enumerate(doc):
        text = page.get_text().lower()
        if any(keyword in text for keyword in keywords):
            chosen.add(index)
    for index in sorted(chosen):
        page = doc[index]
        pix = page.get_pixmap(matrix=fitz.Matrix(1.25, 1.25), alpha=False)
        out_path = OUT / f"{file_path.stem[:24]}-page-{index + 1:02d}.png"
        pix.save(out_path)
        print(f"  rendered page {index + 1}: {out_path}")
