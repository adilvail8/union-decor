"""Crops the burned-in Instagram sticker text out of the reel covers,
keeping only the clean product/showroom area. Source files are the raw
IG downloads; output overwrites into ../img with a -c suffix."""
from PIL import Image
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

# (file, crop box left/top/right/bottom) — boxes chosen by eye per image
JOBS = [
    ("assortiment-1.jpg",   (0, 380, 640, 760),  "showroom-wide.jpg"),   # aisle, between two stickers
    ("spc-smartvinil.jpg",  (0, 0, 640, 640),    "spc-herringbone.jpg"), # panel above sticker
    ("laminat-hoxen.jpg",   (0, 350, 640, 1136), "laminat-panels.jpg"),  # panels below sticker
    ("parket-elochka.jpg",  (0, 440, 640, 1136), "parket-corrida.jpg"),  # oak below sticker
    ("laminat-premium.jpg", (0, 360, 640, 1136), "alsafloor.jpg"),       # ALSAFLOOR display
    ("showroom-2.jpg",      (0, 500, 640, 1136), "showroom-samples.jpg"),
]

for src, box, dst in JOBS:
    im = Image.open(src)
    out = im.crop(box)
    out.save(dst, quality=88, optimize=True)
    print(f"{src} {im.size} -> {dst} {out.size}")
