import pymupdf

doc = pymupdf.open("certificates.pdf")
print(f"Total pages: {len(doc)}")
for i, page in enumerate(doc):
    text = page.get_text().strip()
    images = page.get_images()
    clean_text = " ".join(text.split())[:150]
    print(f"Page {i+1} (images: {len(images)}): text='{clean_text}'")
