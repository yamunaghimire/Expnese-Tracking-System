from datetime import datetime

def clean_and_convert_bill_date(bill_date_str):
    if not bill_date_str:
        return None

    
    corrections = {'M3y': 'May', 'J4n': 'Jan', 'Februry': 'Feb'}
    for wrong, correct in corrections.items():
        bill_date_str = bill_date_str.replace(wrong, correct)

    try:
        # Convert to Python date object
        return datetime.strptime(bill_date_str, '%d/%b/%Y').date()
    except ValueError:
        return None  
