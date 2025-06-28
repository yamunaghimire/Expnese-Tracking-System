# ocr/llm.py
from llama_cpp import Llama

llm = Llama(model_path="mistral-7b-instruct-v0.1.Q4_K_M.gguf", n_ctx=2048)

def clean_receipt_text(text):
    import re
    lines = text.split('\n')
    cleaned = []
    skip_keywords = ['SN.', 'This Order List', 'THANK YOU', 'Please', 'Col lect']

    for i, line in enumerate(lines):
        line = line.strip()
        if any(k in line for k in skip_keywords) or len(line) < 2:
            continue
        line = line.replace('2020,', '2020.00')
        if re.match(r'^\d+\s', line):
            parts = line.split()
            item = " ".join(parts[1:])
            cleaned.append(f"{parts[0]}. {item}")
        else:
            cleaned.append(line)

    return "\n".join(cleaned)

def extract_structured_json(text):
    prompt = f"""
Extract only the following fields from the receipt below and return only valid JSON. Only include the specified fields in the JSON.Do not explain or comment. If a field is missing, return null.

Fields:
•⁠  ⁠merchantName
•⁠  ⁠address
•⁠  ⁠billDate
•⁠  ⁠billNumber
•⁠  ⁠items: list of objects with name, quantity, rate, amount
•⁠  ⁠totalAmount

Receipt:
\"\"\"
{text}
\"\"\"
"""
    response = llm(prompt, max_tokens=1024, temperature=0.1)
    return response["choices"][0]["text"]
