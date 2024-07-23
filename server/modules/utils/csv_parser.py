import csv

# This module is used for parsing security questions in the csv format.
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
            
    for q in questions:
        print(q)

    return questions
