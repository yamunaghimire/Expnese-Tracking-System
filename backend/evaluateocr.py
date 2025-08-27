# # # evaluateocr.py
# # import os
# # import sys
# # import easyocr
# # import pandas as pd
# # from jiwer import wer, cer
# # import matplotlib.pyplot as plt

# # # -----------------------------
# # # Config
# # # -----------------------------
# # CSV_PATH = "billlabels.csv"          # <-- if your file is billslabels.csv, change this to "billslabels.csv"
# # BILLS_DIR = "bills"                   # folder containing your 20 bill images
# # OUTPUT_CSV = "ocr_results.csv"
# # OUTPUT_FIG = "ocr_error_rates.png"

# # # -----------------------------
# # # Read CSV (normalize headers)
# # # -----------------------------
# # try:
# #     labels = pd.read_csv(
# #         CSV_PATH,
# #         dtype=str,
# #         keep_default_na=False  # keep empty strings as empty, not NaN
# #     )
# # except FileNotFoundError:
# #     print(f"[ERROR] CSV not found at: {os.path.abspath(CSV_PATH)}")
# #     sys.exit(1)

# # # Normalize column names: "Filename" -> "filename", "Extracted Text" -> "extracted_text"
# # labels.columns = (
# #     labels.columns
# #     .str.strip()
# #     .str.lower()
# #     .str.replace(r'[^a-z0-9]+', '_', regex=True)
# # )

# # # Validate required columns
# # required = {"filename", "extracted_text"}
# # missing = required - set(labels.columns)
# # if missing:
# #     print(f"[ERROR] CSV is missing columns: {missing}. Found: {list(labels.columns)}")
# #     sys.exit(1)

# # # -----------------------------
# # # Init OCR
# # # -----------------------------
# # # Set gpu=False if you don't have GPU
# # reader = easyocr.Reader(['en'], gpu=False)

# # # -----------------------------
# # # Loop and evaluate
# # # -----------------------------
# # results = []

# # for _, row in labels.iterrows():
# #     filename = row["filename"]
# #     ground_truth = str(row["extracted_text"])

# #     image_path = os.path.join(BILLS_DIR, filename)

# #     if not os.path.isfile(image_path):
# #         print(f"[WARN] Image not found, skipping: {image_path}")
# #         continue

# #     try:
# #         # OCR extraction (detail=0 returns only text lines)
# #         ocr_lines = reader.readtext(image_path, detail=0)
# #         ocr_text = " ".join(ocr_lines) if ocr_lines else ""
# #     except Exception as e:
# #         print(f"[WARN] OCR failed for {filename}: {e}")
# #         ocr_text = ""

# #     # Calculate CER and WER
# #     try:
# #         cer_score = cer(ground_truth, ocr_text)
# #     except Exception as e:
# #         print(f"[WARN] CER failed for {filename}: {e}")
# #         cer_score = float("nan")

# #     try:
# #         wer_score = wer(ground_truth, ocr_text)
# #     except Exception as e:
# #         print(f"[WARN] WER failed for {filename}: {e}")
# #         wer_score = float("nan")

# #     results.append([filename, ground_truth, ocr_text, cer_score, wer_score])

# # # -----------------------------
# # # Results table
# # # -----------------------------
# # if not results:
# #     print("[ERROR] No results to write. Check your CSV and image paths.")
# #     sys.exit(1)

# # df = pd.DataFrame(results, columns=["Filename", "Ground Truth", "OCR Output", "CER", "WER"])
# # # sort by filename so the plot x-axis is consistent
# # df = df.sort_values("Filename").reset_index(drop=True)

# # # Save & print
# # df.to_csv(OUTPUT_CSV, index=False)
# # print(df)

# # # -----------------------------
# # # Plot (saves PNG)
# # # -----------------------------
# # plt.figure(figsize=(12, 6))
# # plt.plot(df["Filename"], df["CER"], marker='o', label="CER")
# # plt.plot(df["Filename"], df["WER"], marker='s', label="WER")
# # plt.xlabel("Bill Filename")
# # plt.ylabel("Error Rate")
# # plt.title("CER & WER per Bill")
# # plt.legend()
# # plt.xticks(rotation=45, ha="right")
# # plt.tight_layout()
# # plt.savefig(OUTPUT_FIG, dpi=200)
# # # plt.show()  # uncomment if you want the interactive window

# # # -----------------------------
# # # Averages
# # # -----------------------------
# # print("\nAverage CER:", df["CER"].mean(skipna=True))
# # print("Average WER:", df["WER"].mean(skipna=True))
# # print(f"\nSaved table to: {os.path.abspath(OUTPUT_CSV)}")
# # print(f"Saved graph to: {os.path.abspath(OUTPUT_FIG)}")

# import os
# import pandas as pd
# import easyocr
# import Levenshtein

# # Directories
# receipt_dir = "bills"         # Folder with receipt images
# ocr_dir = "ocr_output"           # Folder to save OCR text
# os.makedirs(ocr_dir, exist_ok=True)

# # Load CSV with ground truth
# gt_df = pd.read_csv("ground_truth.csv")  # Columns: filename, ground_truth

# # Initialize EasyOCR
# reader = easyocr.Reader(['en'])

# # Helper functions
# def cer(gt_text, ocr_text):
#     return Levenshtein.distance(gt_text, ocr_text) / max(len(gt_text), 1)

# def wer(gt_text, ocr_text):
#     gt_words = gt_text.split()
#     ocr_words = ocr_text.split()
#     return Levenshtein.distance(" ".join(gt_words), " ".join(ocr_words)) / max(len(gt_words), 1)

# # Lists to store metrics and OCR text
# cer_list = []
# wer_list = []
# ocr_text_list = []

# # Process each receipt
# for index, row in gt_df.iterrows():
#     filename = row['filename']
#     gt_text = str(row['ground_truth']).strip()
    
#     receipt_path = os.path.join(receipt_dir, filename)
#     if not os.path.exists(receipt_path):
#         print(f"Receipt not found: {filename}")
#         cer_list.append(None)
#         wer_list.append(None)
#         ocr_text_list.append(None)
#         continue

#     # OCR
#     result = reader.readtext(receipt_path, detail=0)
#     ocr_text = " ".join(result)
#     ocr_text_list.append(ocr_text)

#     # Save OCR text
#     with open(os.path.join(ocr_dir, f"{os.path.splitext(filename)[0]}_ocr.txt"), "w") as f:
#         f.write(ocr_text)

#     # Compute CER and WER
#     cer_score = cer(gt_text, ocr_text)
#     wer_score = wer(gt_text, ocr_text)
#     cer_list.append(cer_score)
#     wer_list.append(wer_score)

#     print(f"{filename} → CER: {cer_score:.3f}, WER: {wer_score:.3f}")

# # Average metrics (excluding missing)
# avg_cer = sum([c for c in cer_list if c is not None]) / len([c for c in cer_list if c is not None])
# avg_wer = sum([w for w in wer_list if w is not None]) / len([w for w in wer_list if w is not None])
# print(f"\nAverage CER: {avg_cer:.3f}")
# print(f"Average WER: {avg_wer:.3f}")

# # Save a final report CSV
# report_df = pd.DataFrame({
#     "filename": gt_df['filename'],
#     "ground_truth": gt_df['ground_truth'],
#     "ocr_text": ocr_text_list,
#     "CER": cer_list,
#     "WER": wer_list
# })

# report_df.to_csv("ocr_evaluation_report.csv", index=False)
# print("\nOCR evaluation report saved as ocr_evaluation_report.csv")



import os
import pandas as pd
import easyocr
import Levenshtein
import matplotlib.pyplot as plt

# Directories
receipt_dir = "bills"         # Folder with receipt images
ocr_dir = "ocr_output"        # Folder to save OCR text
os.makedirs(ocr_dir, exist_ok=True)

# Load CSV with ground truth
gt_df = pd.read_csv("ground_truth.csv")  # Columns: filename, ground_truth

# Initialize EasyOCR
reader = easyocr.Reader(['en'])

# Helper functions
def cer(gt_text, ocr_text):
    return Levenshtein.distance(gt_text, ocr_text) / max(len(gt_text), 1)

def wer(gt_text, ocr_text):
    gt_words = gt_text.split()
    ocr_words = ocr_text.split()
    return Levenshtein.distance(" ".join(gt_words), " ".join(ocr_words)) / max(len(gt_words), 1)

# Lists to store metrics and OCR text
cer_list = []
wer_list = []
ocr_text_list = []

# Process each receipt
for index, row in gt_df.iterrows():
    filename = row['filename']
    gt_text = str(row['ground_truth']).strip()
    
    receipt_path = os.path.join(receipt_dir, filename)
    if not os.path.exists(receipt_path):
        print(f"Receipt not found: {filename}")
        cer_list.append(None)
        wer_list.append(None)
        ocr_text_list.append(None)
        continue

    # OCR
    result = reader.readtext(receipt_path, detail=0)
    ocr_text = " ".join(result)
    ocr_text_list.append(ocr_text)

    # Save OCR text
    with open(os.path.join(ocr_dir, f"{os.path.splitext(filename)[0]}_ocr.txt"), "w") as f:
        f.write(ocr_text)

    # Compute CER and WER
    cer_score = cer(gt_text, ocr_text)
    wer_score = wer(gt_text, ocr_text)
    cer_list.append(cer_score)
    wer_list.append(wer_score)

    print(f"{filename} → CER: {cer_score:.3f}, WER: {wer_score:.3f}")

# Average metrics (excluding missing)
valid_cer = [c for c in cer_list if c is not None]
valid_wer = [w for w in wer_list if w is not None]

avg_cer = sum(valid_cer) / len(valid_cer) if valid_cer else 0
avg_wer = sum(valid_wer) / len(valid_wer) if valid_wer else 0

print(f"\nAverage CER: {avg_cer:.3f}")
print(f"Average WER: {avg_wer:.3f}")

# Save a final report CSV
report_df = pd.DataFrame({
    "filename": gt_df['filename'],
    "ground_truth": gt_df['ground_truth'],
    "ocr_text": ocr_text_list,
    "CER": cer_list,
    "WER": wer_list
})

report_df.to_csv("ocr_evaluation_report.csv", index=False)
print("\nOCR evaluation report saved as ocr_evaluation_report.csv")

# ------------------------
# Plot CER and WER graphs
# ------------------------
valid_indices = [i for i, c in enumerate(cer_list) if c is not None]
valid_filenames = [gt_df['filename'][i] for i in valid_indices]
valid_cer = [cer_list[i] for i in valid_indices]
valid_wer = [wer_list[i] for i in valid_indices]

# CER bar chart
plt.figure(figsize=(12,6))
plt.bar(valid_filenames, valid_cer, color='skyblue')
plt.xticks(rotation=90)
plt.ylabel("CER")
plt.title("Character Error Rate per Receipt")
plt.tight_layout()
plt.savefig("cer_per_receipt.png")
plt.show()

# WER bar chart
plt.figure(figsize=(12,6))
plt.bar(valid_filenames, valid_wer, color='salmon')
plt.xticks(rotation=90)
plt.ylabel("WER")
plt.title("Word Error Rate per Receipt")
plt.tight_layout()
plt.savefig("wer_per_receipt.png")
plt.show()
