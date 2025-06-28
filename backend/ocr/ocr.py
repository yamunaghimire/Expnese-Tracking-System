# ocr/ocr.py
import cv2
import easyocr

def preprocess_image_cv2(image_path):
    image = cv2.imread(image_path)
    image = cv2.resize(image, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return gray

def extract_text_from_image(gray_image):
    reader = easyocr.Reader(['en'])
    results = reader.readtext(gray_image)
    extracted_text = "\n".join([text for _, text, _ in results])
    
   # text = "\n".join([text for _, text, _ in results])
    return extracted_text  # return bounding box too if needed
