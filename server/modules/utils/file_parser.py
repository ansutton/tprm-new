import base64
import csv
import io

def parse_csv_file_buffer(csv_file_buffer):
    # Decode csv file content.
    encoded_csv_content = _extract_base64(csv_file_buffer, 'data:text/csv;base64,')
    csv_content = _decode_base64_csv(encoded_csv_content)

    if csv_content:
        questions = _parse_csv(csv_content)
        return questions
    else:
        return []

def parse_pdf_file_buffer(pdf_file_buffer):
    # Decode pdf file content.
    encoded_pdf_content = _extract_base64(pdf_file_buffer, 'data:application/pdf;base64')
    pdf_content = _decode_base64_pdf(encoded_pdf_content)
    
    if pdf_content:
        return pdf_content
    else:
        return 'nothing, sorry'

# Removes prefix and extracts the base64 encoded string
def _extract_base64(encoded_data, prefix):
    if encoded_data.startswith(prefix):
        return encoded_data[len(prefix):]

# Decodes base64 encoded PDF file content
def _decode_base64_pdf(encoded_str):
    decoded_bytes = base64.b64decode(encoded_str)
    # print(decoded_bytes[0:4])
    # return decoded_bytes
    return decoded_bytes

# Decodes base64 encoded CSV file content
def _decode_base64_csv(encoded_str):
    decoded_bytes = base64.b64decode(encoded_str)
    decoded_str = decoded_bytes.decode('utf-8-sig')
    return decoded_str

# Parses the decoded CSV as required
def _parse_csv(csv_content):
    csv_file = io.StringIO(csv_content)
    csv_reader = csv.reader(csv_file)
    questions = []

    for i, row in enumerate(csv_reader):
        if (i==0 and all (item.strip().isalpha() for item in row)):
            # Check if first row contains header-like element (all characters are letters, no question marks)
            continue
        questions.append(', '.join(row))

    return questions

# This module is used for parsing security questions in the csv format from a local file path input.
# Deprecated. Not needed since we are passing file buffers instead of file paths.
def parse_csv_file(file_path):
    questions = []
    with open(file_path, mode='r', newline='', encoding = 'utf-8-sig') as csvfile:
        csvreader = csv.reader(csvfile)
        first_row = next(csvreader)

        # Check if first row contains header-like element (all characters are letters, no question marks)
        if all (item.strip().isalpha() for item in first_row):
            pass
        else:
            questions.append(first_row[0])

        # Append remaining rows
        for row in csvreader:
            questions.append(row[0]) # column 0th index
            
    # for q in questions: 
    #     print(q)

    return questions