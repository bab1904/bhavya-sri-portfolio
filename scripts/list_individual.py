# Script to display every cert index and info
import os

files = sorted(os.listdir("public/certificates/individual"))
pngs = [f for f in files if f.endswith(".png")]
print(f"Total individual certificate PNGs: {len(pngs)}")
for p in pngs:
    size = os.path.getsize(os.path.join("public/certificates/individual", p))
    print(f"{p}: {size} bytes")
