import pymupdf

doc = pymupdf.open("certificates.pdf")
print(f"Total pages in doc: {len(doc)}")

for i, page in enumerate(doc):
    rect = page.rect
    img_list = page.get_images()
    print(f"\n--- Page {i+1} (w={rect.width}, h={rect.height}) ---")
    for j, img in enumerate(img_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        w = base_image["width"]
        h = base_image["height"]
        ext = base_image["ext"]
        print(f"  Img {j+1}: xref={xref}, size={w}x{h}, ext={ext}")
