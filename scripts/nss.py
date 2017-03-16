#!/usr/bin/env python3

'''
Python based processing of Armenian
government statistics and other valuable
measures of economic well being.
'''

import os
import tempfile
import sqlite3
import requests
import xlrd
import click


class QueryHandler:
    '''Object to provide querying to our db'''
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()

    def source_links(self):
        '''Produce all the link that we need to download from'''
        self.cursor.execute('select * from source_link')
        return self.cursor.fetchall()

    def run_query(self, query):
        '''Get back all the records for a query'''
        self.cursor.execute(query)
        return self.cursor.fetchall()


def produce_data(db_name):
    '''
    Download the data from the links kept in the DB,
    gives back (excel_files, pdf_files) iterators
    '''
    links_source = QueryHandler(db_name).source_links()
    results = []
    for record in links_source:
        (_, ext) = os.path.splitext(record[5])
        try:
            results.append({
                'id':record[0],
                'source-name':record[1],
                'frequency':record[2],
                'data-category':'excel' if ext in ('.xlsx', '.xls') else 'pdf',
                'description':record[4],
                'download-result':requests.get(record[5]).text})
        except Exception as e:
            print(e)

    excel_files = filter(lambda s: s['data-category'] == 'excel',
                         results)
    pdf_files = filter(lambda s: s['data-category'] == 'pdf',
                       results)
    return (excel_files, pdf_files)


# def make_convert (file_path):
#     junkfile = file_path
#     junkopen = xlrd.open_workbook(junkfile)
#     sheet_names = junkopen.sheet_names()
#     sheets = junkopen.sheets()
#     for sheet_index in range(len(sheets)):
#         sheet_file = './junk/'
#         sheet_name = sheet_names[sheet_index]
#         sheet_format = '.csv'
#         sfile = '{}{}{}'.format(sheet_file,sheet_name,sheet_format)
#         with open(sfile, 'w') as csvFile:
#             for rows in range(sheets[sheet_index].nrows):
#                 writer = csv.writer(csvFile, quoting=csv.QUOTE_MINIMAL)
#                 writer.writerow(sheets[sheet_index].row_values(rows))


def process_excel(excel_files):
    '''Process the excel data, use a temp file to write the results'''
    (_, temp_file) = tempfile.mkstemp()
    for document in excel_files:
        try:
            with open(temp_file, 'w') as ex_file:
                ex_file.write(document)
            # some code
        except Exception as e:
            print('Not sure what happened')
            print(e)
    os.remove(temp_file)

    # Process results according to if it is a PDF or an Excel file

@click.command()
@click.option('--sources',
              default=['ArmStat', 'Tax Service'],
              help=
              'Where we should source data from, '
              'can be ArmStat or Tax Service')
def pipeline(sources):
    '''Entry point of our program'''
    print('Starting processing...', sources)



if __name__ == '__main__':
    pipeline()
