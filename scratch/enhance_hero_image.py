import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import os

source_path = 'public/images/hero/msk-logistics-cinematic-bg.png'
output_png_2560 = 'public/images/hero/msk-cinematic-port-final.png'
output_bg_2560 = 'public/images/hero/msk-logistics-cinematic-bg.png'

print("Loading source image:", source_path)
bgr = cv2.imread(source_path)
h, w, c = bgr.shape
print(f"Original dimensions: {w}x{h}")

# Step 1: Subtle edge-preserving bilateral filtering to eliminate JPEG compression macroblocks
print("Step 1: Edge-preserving artifact reduction...")
denoised = cv2.bilateralFilter(bgr, d=5, sigmaColor=18, sigmaSpace=18)

# Step 2: High-fidelity Lanczos-4 upscaling to 2560x1280 (2.5x native resolution)
target_w = 2560
target_h = 1280
print(f"Step 2: Upscaling with Lanczos-4 to {target_w}x{target_h}...")
upscaled = cv2.resize(denoised, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)

# Step 3: Convert to LAB color space for targeted luminance enhancement
print("Step 3: CLAHE micro-contrast on Luminance channel...")
lab = cv2.cvtColor(upscaled, cv2.COLOR_BGR2LAB)
l_channel, a_channel, b_channel = cv2.split(lab)

# Apply subtle CLAHE to bring out deep crane truss details, container ribs, and reflections
clahe = cv2.createCLAHE(clipLimit=1.6, tileGridSize=(16, 16))
l_enhanced = clahe.apply(l_channel)

# Merge back with untouched A and B color channels to preserve 100% color authenticity
lab_enhanced = cv2.merge((l_enhanced, a_channel, b_channel))
rgb_enhanced = cv2.cvtColor(lab_enhanced, cv2.COLOR_LAB2RGB)

# Step 4: Multi-stage Unsharp Masking for crisp edge definition
print("Step 4: Unsharp masking for crisp edges and structural details...")
pil_img = Image.fromarray(rgb_enhanced)

# Fine edge unsharp mask: radius=1.8, percent=140, threshold=2
sharp_1 = pil_img.filter(ImageFilter.UnsharpMask(radius=1.8, percent=140, threshold=2))

# Micro-texture unsharp mask: radius=0.8, percent=90, threshold=1
sharp_2 = sharp_1.filter(ImageFilter.UnsharpMask(radius=0.8, percent=90, threshold=1))

# Step 5: Subtle sharpness & contrast tuning
sharpness_enhancer = ImageEnhance.Sharpness(sharp_2)
final_img = sharpness_enhancer.enhance(1.15)

contrast_enhancer = ImageEnhance.Contrast(final_img)
final_img = contrast_enhancer.enhance(1.04)

print("Step 5: Saving master high-resolution images...")
# Save both filenames so all references get the enhanced 2560x1280 asset
final_img.save(output_png_2560, format='PNG', optimize=True)
final_img.save(output_bg_2560, format='PNG', optimize=True)

print("Successfully generated ultra-sharp master hero images at 2560x1280!")
print(f"File 1: {output_png_2560} (size: {os.path.getsize(output_png_2560)} bytes)")
print(f"File 2: {output_bg_2560} (size: {os.path.getsize(output_bg_2560)} bytes)")

