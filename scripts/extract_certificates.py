import os
import pymupdf  # PyMuPDF
from PIL import Image

def extract_pdf_pages(pdf_path="certificates.pdf", output_dir="public/certificates", dpi=300):
    os.makedirs(output_dir, exist_ok=True)
    
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF file not found at {pdf_path}")
        
    doc = pymupdf.open(pdf_path)
    total_pages = len(doc)
    print(f"Loaded {pdf_path} with {total_pages} pages.")
    
    # Zoom matrix for DPI (default PDF is 72 dpi)
    zoom = dpi / 72.0
    matrix = pymupdf.Matrix(zoom, zoom)
    
    saved_files = []
    
    for page_num in range(total_pages):
        page = doc[page_num]
        pix = page.get_pixmap(matrix=matrix, alpha=False)
        
        # Format filename as cert-01.png, cert-02.png, etc.
        index_str = f"{page_num + 1:02d}"
        png_path = os.path.join(output_dir, f"cert-{index_str}.png")
        webp_path = os.path.join(output_dir, f"cert-{index_str}.webp")
        
        # Save raw high-res image
        pix.save(png_path)
        
        # Also generate optimized WebP version for fast web loading
        img = Image.open(png_path)
        img.save(webp_path, "WEBP", quality=88, method=6)
        
        file_size_png = os.path.getsize(png_path) / 1024
        file_size_webp = os.path.getsize(webp_path) / 1024
        print(f"Page {page_num + 1}/{total_pages}: {img.width}x{img.height}px -> {png_path} ({file_size_png:.1f} KB), {webp_path} ({file_size_webp:.1f} KB)")
        
        saved_files.append({
            "page": page_num + 1,
            "png": png_path,
            "webp": webp_path,
            "width": img.width,
            "height": img.height
        })
        
    print(f"\nSuccessfully extracted all {total_pages} pages to {output_dir}")
    return saved_files

if __name__ == "__main__":
    extract_pdf_pages()
