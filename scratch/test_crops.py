from PIL import Image

img = Image.open('C:/MSK-Logistics/scratch/test_sharp_2048.png')
w, h = img.size

# 1. Airplane crop
plane_crop = img.crop((int(w * 0.30), int(h * 0.15), int(w * 0.55), int(h * 0.40)))
plane_crop.save('C:/MSK-Logistics/scratch/crop_plane_2048.png')

# 2. Train crop
train_crop = img.crop((int(w * 0.28), int(h * 0.45), int(w * 0.50), int(h * 0.75)))
train_crop.save('C:/MSK-Logistics/scratch/crop_train_2048.png')

# 3. Truck crop
truck_crop = img.crop((int(w * 0.65), int(h * 0.50), int(w * 0.98), int(h * 0.80)))
truck_crop.save('C:/MSK-Logistics/scratch/crop_truck_2048.png')

# 4. Ship crop
ship_crop = img.crop((int(w * 0.50), int(h * 0.20), int(w * 0.80), int(h * 0.65)))
ship_crop.save('C:/MSK-Logistics/scratch/crop_ship_2048.png')

print("Crops saved!")

