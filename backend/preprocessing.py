# # import cv2
# # import numpy as np

# # # Step 1: Load image and enlarge it (double size)
# # img = cv2.imread("images/receipt.JPG")
# # scale = 2  # 2x upscale
# # width = int(img.shape[1] * scale)
# # height = int(img.shape[0] * scale)
# # resized = cv2.resize(img, (width, height), interpolation=cv2.INTER_CUBIC)

# # # Step 2: Convert the image to grayscale (single channel)
# # gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)

# # # Step 3: Remove noise using median filter (good for salt-and-pepper noise)
# # denoised = cv2.medianBlur(gray, 3)

# # # Step 4: Sharpen the image using unsharp masking
# # # blurred = cv2.GaussianBlur(denoised, (9, 9), 10)
# # sharpened = cv2.addWeighted(denoised, 1.5, blurred, -0.5, 0)

# # # Step 5: Convert to black and white using Otsu's thresholding
# # _, binary = cv2.threshold(sharpened, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# # # Step 6: Detect edges for line detection, invert colors because text is dark
# # edges = cv2.Canny(255 - binary, 50, 150, apertureSize=3)

# # # Step 7: Use Hough Transform to find lines in the image and normalize angles
# # lines = cv2.HoughLines(edges, 1, np.pi / 180, 100)
# # angles = []

# # if lines is not None:
# #     for rho, theta in lines[:, 0]:
# #         angle = np.degrees(theta) - 90
# #         if angle > 45:
# #             angle -= 90
# #         elif angle < -45:
# #             angle += 90
# #         angles.append(angle)

# # # Step 8: Calculate the average angle of detected lines
# # avg_angle = np.mean(angles) if angles else 0
# # print(f"Detected skew angle: {avg_angle:.2f} degrees")

# # # Step 9: Rotate the image to correct the skew
# # (h, w) = binary.shape
# # center = (w // 2, h // 2)
# # rotation_matrix = cv2.getRotationMatrix2D(center, avg_angle, 1.0)
# # deskewed = cv2.warpAffine(binary, rotation_matrix, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)

# # # Step 10: Show the corrected image
# # cv2.imshow("Deskewed Image", deskewed)
# # cv2.waitKey(0)
# # cv2.destroyAllWindows()



# import cv2
# import numpy as np

# # Step 1: Load and enlarge image (simulate higher DPI)
# img = cv2.imread("images/receipt.JPG")
# # scale = 1
# # width = int(img.shape[1] * scale)
# # height = int(img.shape[0] * scale)
# # resized = cv2.resize(img, (width, height), interpolation=cv2.INTER_CUBIC)
# # cv2.imshow("Step 1: Resized", resized)

# # Step 2: Convert to Grayscale
# gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# cv2.imshow("Step 2: Grayscale", gray)

# # Step 3: Median Filtering (Noise Reduction)
# denoised = cv2.medianBlur(gray, 3)
# cv2.imshow("Step 3: Denoised (Median Blur)", denoised)

# # Step 4: Unsharp Masking (Sharpening)
# blurred = cv2.GaussianBlur(denoised, (1, 1), 0)
# sharpened = cv2.addWeighted(denoised, 1.5, blurred, -0.5, 0)
# cv2.imshow("Step 4: Sharpened", sharpened)

# # Step 5: Adaptive Thresholding (instead of Otsu) – better for unclear/faint text
# binary = cv2.adaptiveThreshold(
#     sharpened, 255,
#     cv2.ADAPTIVE_THRESH_GAUSSIAN_C,  # Gaussian-weighted sum of neighborhood
#     cv2.THRESH_BINARY,
#     11,7  # blockSize=11, C=2 (you can tune)
# )
# cv2.imshow("Step 5: Binarized (Adaptive Threshold)", binary)

# # Step 6: Canny Edge Detection for Hough Transform (on adaptive threshold)
# edges = cv2.Canny(binary, 50, 150, apertureSize=3)
# cv2.imshow("Step 6: Canny Edges (from Adaptive Threshold)", edges)


# # Step 7: Hough Line Detection and angle collection
# lines = cv2.HoughLines(edges, 1, np.pi / 180, 100)
# angles = []

# if lines is not None:
#     for rho, theta in lines[:, 0]:
#         angle = np.degrees(theta) - 90
#         if angle > 45:
#             angle -= 90
#         elif angle < -45:
#             angle += 90
#         angles.append(angle)

# # Step 8: Average skew angle
# avg_angle = np.mean(angles) if angles else 0
# print(f"Detected skew angle: {avg_angle:.2f} degrees")

# # Step 9: Rotate to correct skew
# (h, w) = binary.shape
# center = (w // 2, h // 2)
# rotation_matrix = cv2.getRotationMatrix2D(center, avg_angle, 1.0)
# deskewed = cv2.warpAffine(binary, rotation_matrix, (w, h),
#                           flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
# cv2.imshow("Step 9: Deskewed Image", deskewed)

# # Final wait and close
# cv2.waitKey(0)
# cv2.destroyAllWindows()
# preprocessing.py

import cv2
import numpy as np
import os

def preprocess_image_cv2(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    denoised = cv2.medianBlur(gray, 3)
    blurred = cv2.GaussianBlur(denoised, (1, 1), 0)
    sharpened = cv2.addWeighted(denoised, 1.5, blurred, -0.5, 0)
    binary = cv2.adaptiveThreshold(
        sharpened, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11, 7
    )
    edges = cv2.Canny(binary, 50, 150, apertureSize=3)

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

    avg_angle = np.mean(angles) if angles else 0

    (h, w) = binary.shape
    center = (w // 2, h // 2)
    rotation_matrix = cv2.getRotationMatrix2D(center, avg_angle, 1.0)
    deskewed = cv2.warpAffine(binary, rotation_matrix, (w, h),
                              flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)

    base, ext = os.path.splitext(image_path)
    processed_path = f"{base}_processed{ext}"
    cv2.imwrite(processed_path, deskewed)

    return processed_path
