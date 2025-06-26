import cv2
import numpy as np
import os

def load_image(path):
    return cv2.imread(path)

def to_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def upscale_image(image, scale=2):
    height, width = image.shape[:2]
    return cv2.resize(image, (width * scale, height * scale), interpolation=cv2.INTER_CUBIC)

def denoise_image(image):
    return cv2.medianBlur(image, 3)

def sharpen_image(image):
    blurred = cv2.GaussianBlur(image, (5, 5), 0)
    return cv2.addWeighted(image, 1.5, blurred, -0.5, 0)

def binarize_image(image):
    return cv2.adaptiveThreshold(
        image, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31, 10
    )


def detect_skew_angle(image):
    edges = cv2.Canny(image, 50, 150, apertureSize=3)
    lines = cv2.HoughLines(edges, 1, np.pi / 180, 100)
    angles = []

    if lines is not None:
        for rho, theta in lines[:, 0]:
            angle = np.degrees(theta) - 90
            if angle > 45:
                angle -= 90
            elif angle < -45:
                angle += 90
            angles.append(angle)

    return np.mean(angles) if angles else 0

def deskew_image(image, angle):
    (h, w) = image.shape
    center = (w // 2, h // 2)
    rot_matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
    return cv2.warpAffine(image, rot_matrix, (w, h),
                          flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)

def preprocess_image_cv2(image_path):
    img = load_image(image_path)
    gray = to_grayscale(img)
    upscaled = upscale_image(gray, scale=2)
    denoised = denoise_image(upscaled)
    sharpened = sharpen_image(denoised)
    binary = binarize_image(sharpened)
    
    # Deskew the binary image (same used for angle detection)
    angle = detect_skew_angle(binary)
    deskewed = deskew_image(binary, angle)
    
    angle = detect_skew_angle(deskewed)
    deskewed = deskew_image(deskewed, angle)

    processed_path = os.path.splitext(image_path)[0] + "_processed.png"
    cv2.imwrite(processed_path, deskewed)
    return processed_path
