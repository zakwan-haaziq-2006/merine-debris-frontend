import os
from PIL import Image

src_path = r"C:\Users\Samiiksha\.gemini\antigravity-ide\brain\105f7b75-dcd4-4ff1-8f85-be15a2514a2d\survey_vessel_topdown_1788158730253.jpg"
dest_dir = r"D:\Ocean debris\public\assets"
os.makedirs(dest_dir, exist_ok=True)
dest_path = os.path.join(dest_dir, "survey_vessel_transparent.png")

if os.path.exists(src_path):
    img = Image.open(src_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # The background is solid dark black/near-black (#000000 to #0d0d0f)
    for item in datas:
        r, g, b, a = item
        # If dark background pixel
        brightness = (r * 299 + g * 587 + b * 114) / 1000
        if brightness < 18 and max(r, g, b) < 25:
            # Smooth feathering near threshold
            alpha = int((brightness / 18.0) * 255) if brightness > 10 else 0
            newData.append((r, g, b, alpha))
        elif brightness < 32 and max(r, g, b) < 40:
            alpha = int(((brightness - 18) / 14.0) * 255)
            newData.append((r, g, b, alpha))
        else:
            newData.append((r, g, b, 255))
            
    img.putdata(newData)
    img.save(dest_path, "PNG")
    print("Saved transparent boat to", dest_path)
else:
    print("Source image not found")
