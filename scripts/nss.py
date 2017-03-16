#!/usr/bin/env python3

'''
Python based processing of Armenian
government statistics and other valuable
measures of economic well being.
'''

import os
import tempfile
import sqlite3
import hashlib
import datetime

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

    def persist_hash_result(self, digest, record):
        '''Persist the hash of a download from a source for today'''
        self.cursor.execute('''
insert into query_source_result (id, download_date, checksum)
values (?, ?, ?)
''', (record['id'], datetime.datetime.now().timestamp(), digest))

    def run_query(self, query):
        '''Get back all the records for a query'''
        self.cursor.execute(query)
        return self.cursor.fetchall()


def produce_data(db_handle):
    '''
    Download the data from the links kept in the DB,
    gives back (excel_files, pdf_files) iterators
    '''
    links_source = db_handle.source_links()
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
                # Use content instead of text since need as binary
                'download-result':requests.get(record[5]).content
            })
        except requests.RequestException as e:
            print(e)

    excel_files = filter(lambda s: s['data-category'] == 'excel',
                         results)
    pdf_files = filter(lambda s: s['data-category'] == 'pdf',
                       results)
    return (excel_files, pdf_files)


def handle_central_gov_debt(work_book, db_handle):
    '''Persist the central government debt'''
    sheet_en = work_book.sheet_by_name('En')


def handle_general_gov_ops(work_book, db_handle):
    # Inconsistent naming
    sheet_en = work_book.sheet_by_name('Eng')


def persist_digest(record, db_handle):
    '''Persist the MD5 digest of a downloaded dataset'''
    md5 = hashlib.md5()
    md5.update(record['download-result'])
    digest = md5.digest()
    db_handle.persist_hash_result(digest)


def process_excel(excel_files, db_handle):
    '''Process the excel data, use a temp file to write the results'''
    (_, temp_file) = tempfile.mkstemp()
    for record in excel_files:
        try:
            persist_digest(record, db_handle)
            with open(temp_file, 'wb') as ex_file:
                ex_file.write(record['download-result'])
            xlrd_handle = xlrd.open_workbook(temp_file)
            if record['description'] == 'Central Government Debt':
                handle_central_gov_debt(xlrd_handle, db_handle)
            elif record['description'] == 'General Government Operations':
                handle_general_gov_ops(xlrd_handle, db_handle)
            else:
                raise Exception('Unknown description {}'.format(str(record)))
        except Exception as e:
            print(e)
    os.remove(temp_file)


@click.command()
@click.option('--dbname', default='nss-alive.db', help='Path to the sqlite database')
@click.option('--sources',
              default=['ArmStat', 'Tax Service'],
              help=
              'Where we should source data from, '
              'can be ArmStat or Tax Service')
def pipeline(dbname, sources):
    '''Entry point of our program'''
    print('Starting processing...{}\n'.format(str(sources)))
    db_handle = QueryHandler(dbname)
    (excel_files, pdf_files) = produce_data(db_handle)
    process_excel(excel_files, db_handle)


if __name__ == '__main__':
    pipeline()
