import pdfplumber
import re

class PDFProcessor:
    @staticmethod
    def clean_text(text):
        text = re.sub(r'[^\x00-\x7F]+', ' ', text) 
        text = re.sub(r'\s+', ' ', text).strip()  
        return text

    @classmethod
    def extract_text(cls, file_path, max_chars=8000):
        try:
            with pdfplumber.open(file_path) as pdf:
                full_text = " ".join(page.extract_text() or "" for page in pdf.pages)
                return cls.clean_text(full_text)[:max_chars]  
        except Exception as e:
            print(f"PDF Error: {str(e)}")
            return None