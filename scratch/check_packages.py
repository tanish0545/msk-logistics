try:
    import PIL
    from PIL import Image, ImageFilter, ImageEnhance
    print("PIL is available:", PIL.__version__)
except ImportError as e:
    print("PIL not available:", e)

try:
    import cv2
    print("cv2 is available:", cv2.__version__)
except ImportError:
    print("cv2 not available")

