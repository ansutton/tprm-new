import csv
import base64
import io

# This module is used for parsing security questions in the csv format from a local file path input.
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

def extract_base64(encoded_data): #Removes prefix and extracts the base64 encoded string
    prefix = 'data:text/csv;base64,'
    if encoded_data.startswith(prefix):
        return encoded_data[len(prefix):]
def decode_base64(encoded_str): #Decodes base64 encoded CSV file content
    decoded_bytes = base64.b64decode(encoded_str)
    decoded_str = decoded_bytes.decode('utf-8-sig')
    return decoded_str
def parse_csv(csv_content): #parses the decoded CSV as required
    csv_file = io.StringIO(csv_content)
    csv_reader = csv.reader(csv_file)
    questions = []
    for i, row in enumerate(csv_reader):
        if (i==0 and all (item.strip().isalpha() for item in row)):
            # Check if first row contains header-like element (all characters are letters, no question marks)
            continue
        questions.append(', '.join(row))
    return questions
