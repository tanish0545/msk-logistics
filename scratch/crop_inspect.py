from PIL import Image

img = Image.open('public/images/hero/msk-cinematic-port-final.png')
w, h = img.size
print(f"Image dimensions: {w}x{h}")

# Crop regions to inspect detail:
# 1. Airplane region (around x: 30%-55%, y: 15%-40%)
plane_crop = img.crop((int(w * 0.30), int(h * 0.15), int(w * 0.55), int(h * 0.40)))
plane_crop.save('C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d/inspect_plane.png')

# 2. Train region (around x: 28%-50%, y: 45%-75%)
train_crop = img.crop((int(w * 0.28), int(h * 0.45), int(w * 0.50), int(h * 0.75)))
train_crop.save('C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d/inspect_train.png')

# 3. Ship and cranes region (around x: 50%-80%, y: 20%-65%)
ship_crop = img.crop((int(w * 0.50), int(h * 0.20), int(w * 0.80), int(h * 0.65)))
ship_crop.save('C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d/inspect_ship.png')

# 4. Truck & forklift region (around x: 65%-98%, y: 50%-80%)
truck_crop = img.crop((int(w * 0.65), int(h * 0.50), int(w * 0.98), int(h * 0.80)))
truck_crop.save('C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d/inspect_truck.png')

print("Cropped inspection images saved to artifact directory.")

