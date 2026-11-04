import cv2
import numpy as np

# Load original 1024x512
orig = cv2.imread('C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d/.user_uploaded/media_1793632502451_f27a8b9e.jpg')
h, w = orig.shape[:2]

# Let's test a true super-resolution & multi-scale detail enhancement pipeline:
# 1. First, enhance the 1024x512 original before scaling:
lab_orig = cv2.cvtColor(orig, cv2.COLOR_BGR2LAB)
l_orig, a_orig, b_orig = cv2.split(lab_orig)

# CLAHE on original for micro-texture
clahe_orig = cv2.createCLAHE(clipLimit=2.2, tileGridSize=(8, 8))
l_clahe = clahe_orig.apply(l_orig)

# Micro-edge sharpening on 1024x512
blur_small = cv2.GaussianBlur(l_clahe, (0, 0), sigmaX=0.8)
l_sharp_orig = cv2.addWeighted(l_clahe, 1.8, blur_small, -0.8, 0)

lab_orig_sharp = cv2.merge((l_sharp_orig, a_orig, b_orig))
bgr_orig_sharp = cv2.cvtColor(lab_orig_sharp, cv2.COLOR_LAB2BGR)

# 2. Upscale to 2048x1024 (2x) using Lanczos4
up_2x = cv2.resize(bgr_orig_sharp, (2048, 1024), interpolation=cv2.INTER_LANCZOS4)

# 3. Post-upscale multi-scale unsharp masking on Luminance
lab_up = cv2.cvtColor(up_2x, cv2.COLOR_BGR2LAB)
l_up, a_up, b_up = cv2.split(lab_up)

# Fine detail pass (radius ~1.0)
blur_fine = cv2.GaussianBlur(l_up, (0, 0), sigmaX=1.0)
detail_fine = cv2.subtract(l_up, blur_fine)
l_boost1 = cv2.add(l_up, cv2.multiply(detail_fine, 1.6))

# Medium structure pass (radius ~2.5) for crane beams, containers, train lines
blur_med = cv2.GaussianBlur(l_boost1, (0, 0), sigmaX=2.5)
detail_med = cv2.subtract(l_boost1, blur_med)
l_boost2 = cv2.add(l_boost1, cv2.multiply(detail_med, 0.8))

# Subtle contrast stretch
l_final = cv2.normalize(l_boost2, None, alpha=2, beta=253, norm_type=cv2.NORM_MINMAX)

lab_final = cv2.merge((l_final, a_up, b_up))
bgr_final = cv2.cvtColor(lab_final, cv2.COLOR_LAB2BGR)

lap_final = cv2.Laplacian(cv2.cvtColor(bgr_final, cv2.COLOR_BGR2GRAY), cv2.CV_64F).var()
print(f"Original 1024x512 Laplacian: {cv2.Laplacian(cv2.cvtColor(orig, cv2.COLOR_BGR2GRAY), cv2.CV_64F).var():.2f}")
print(f"New 2048x1024 Laplacian: {lap_final:.2f}")

cv2.imwrite('C:/MSK-Logistics/scratch/test_sharp_2048.png', bgr_final)

