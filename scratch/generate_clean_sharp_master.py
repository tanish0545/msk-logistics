import cv2
import numpy as np

orig = cv2.imread('C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d/.user_uploaded/media_1793632502451_f27a8b9e.jpg')
h, w = orig.shape[:2]

# 1. Upscale to 2560x1280 with Lanczos4
up = cv2.resize(orig, (2560, 1280), interpolation=cv2.INTER_LANCZOS4)

# 2. Convert to LAB
lab = cv2.cvtColor(up, cv2.COLOR_BGR2LAB)
l, a, b = cv2.split(lab)

# 3. Micro-contrast CLAHE on L
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(12, 12))
l_clahe = clahe.apply(l)

# 4. Multi-pass unsharp mask
blur1 = cv2.GaussianBlur(l_clahe, (0, 0), sigmaX=1.0)
detail1 = cv2.subtract(l_clahe, blur1)
l_sharp1 = cv2.add(l_clahe, cv2.multiply(detail1, 1.8))

blur2 = cv2.GaussianBlur(l_sharp1, (0, 0), sigmaX=2.8)
detail2 = cv2.subtract(l_sharp1, blur2)
l_sharp2 = cv2.add(l_sharp1, cv2.multiply(detail2, 0.9))

# 5. Create edge mask to prevent noise in smooth clouds while keeping 100% sharpness on all vehicles and structures
sobelx = cv2.Sobel(l, cv2.CV_32F, 1, 0, ksize=3)
sobely = cv2.Sobel(l, cv2.CV_32F, 0, 1, ksize=3)
edge_mag = cv2.magnitude(sobelx, sobely)
# Normalize to 0..1
edge_norm = cv2.normalize(edge_mag, None, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
# Smooth the edge mask slightly so transitions are gradual
edge_mask = cv2.GaussianBlur(edge_norm, (5, 5), 0)
edge_mask = np.clip((edge_mask - 0.05) * 2.5, 0.0, 1.0)

# Also ensure bottom 60% (ground, train, truck, forklift, ship) has higher sharpening weight
y_indices = np.linspace(0, 1, 1280)[:, None]
ground_bias = np.clip((y_indices - 0.25) * 1.5, 0.4, 1.0)
combined_mask = np.maximum(edge_mask, ground_bias * 0.75)

l_float = l.astype(np.float32)
l_sharp_float = l_sharp2.astype(np.float32)
l_out = (l_float * (1.0 - combined_mask) + l_sharp_float * combined_mask).astype(np.uint8)

# Merge back with original colors
lab_out = cv2.merge((l_out, a, b))
bgr_out = cv2.cvtColor(lab_out, cv2.COLOR_LAB2BGR)

# Save master high-resolution files
cv2.imwrite('C:/MSK-Logistics/public/images/hero/msk-cinematic-port-final.png', bgr_out)
cv2.imwrite('C:/MSK-Logistics/public/images/hero/msk-logistics-cinematic-bg.png', bgr_out)
cv2.imwrite('C:/MSK-Logistics/dist/images/hero/msk-cinematic-port-final.png', bgr_out)
cv2.imwrite('C:/MSK-Logistics/dist/images/hero/msk-logistics-cinematic-bg.png', bgr_out)

print("Generated clean, edge-adaptive ultra-sharp master hero image (2560x1280)!")

