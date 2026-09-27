import os
import pymupdf
from PIL import Image
import io

doc = pymupdf.open("certificates.pdf")
os.makedirs("public/certificates/individual", exist_ok=True)

extracted_info = []

cert_idx = 1
for page_num, page in enumerate(doc):
    # Let's inspect image placements on the page
    img_list = page.get_images()
    print(f"\n--- Page {page_num+1} ({len(img_list)} images) ---")
    
    # Sort images by their vertical position (y0) on the page if possible
    # We can get image rects on the page
    page_img_rects = []
    for img in img_list:
        xref = img[0]
        # find rect on page
        rects = page.get_image_rects(xref)
        y0 = rects[0].y0 if rects else 0
        page_img_rects.append((y0, xref, rects))
    
    page_img_rects.sort(key=lambda x: x[0])
    
    for y0, xref, rects in page_img_rects:
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        pil_img = Image.open(io.BytesIO(image_bytes))
        
        filename_base = f"cert-{cert_idx:02d}"
        png_path = f"public/certificates/individual/{filename_base}.png"
        webp_path = f"public/certificates/individual/{filename_base}.webp"
        
        pil_img.save(png_path, "PNG")
        pil_img.save(webp_path, "WEBP", quality=92)
        
        print(f"Saved {filename_base}: size={pil_img.size}, mode={pil_img.mode}")
        extracted_info.append({
            "idx": cert_idx,
            "page": page_num + 1,
            "size": pil_img.size,
            "png": f"/certificates/individual/{filename_base}.png",
            "webp": f"/certificates/individual/{filename_base}.webp"
        })
        cert_idx += 1

print(f"\nTotal individual certificates extracted: {len(extracted_info)}")
