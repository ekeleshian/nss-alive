import sqlite3
import requests
import xlrd
import csv

def make_convert (file_path):
    junkfile = file_path
    junkopen = xlrd.open_workbook(junkfile)
    sheet_names = junkopen.sheet_names()
    sheets = junkopen.sheets()
    for sheet_index in range(len(sheets)):
        sheet_file = './junk/'
        sheet_name = sheet_names[sheet_index]
        sheet_format = '.csv'
        sfile = '{}{}{}'.format(sheet_file,sheet_name,sheet_format)
        with open(sfile, 'w') as csvFile:
            for rows in range(sheets[sheet_file].nrows):
                writer = csv.writer(csvFile, quoting=csv.QUOTE_MINIMAL)
                writer.writerow(sheets[sheet_file].row_values(rows))0
make_convert('./junk/99501863.xlsx')
# if __name__ == '__main__':
#     print("Hello World")
