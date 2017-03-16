--Needed to turn on foreign key constraints, not on by default because
--of sqlite backward compatibility
PRAGMA foreign_keys = ON;

CREATE TABLE source_link (
    id INTEGER PRIMARY KEY autoincrement,
    source_name TEXT NOT NULL DEFAULT 'ArmStat',
    frequency TEXT NOT NULL DEFAULT 'Quarterly',
    data_category TEXT NOT NULL,
    descr TEXT NOT NULL,
    link_url text NOT NULL
);

CREATE TABLE favorite_user_graph (
    id INTEGER PRIMARY KEY autoincrement,
    link text NOT NULL
);

CREATE TABLE central_gov_debt (
    id INTEGER PRIMARY KEY autoincrement,
    -- Its a quarterly basis
    time_period TEXT NOT NULL,
    -- In billions of dram
    domestic_debt_long_term_dram TEXT NOT NULL,
    domestic_debt_short_term_dram TEXT NOT NULL,
    -- All now in usd
    total_external_debt_usd TEXT NOT NULL,
    -- Next three should sum to total_external_debt_usd
    -- international organizations or multilateral other organizations
    multilateral_debt_usd TEXT NOT NULL,
    -- contracts with governments or bilateral other contracts
    bilateral_debt_usd TEXT NOT NULL,
    central_bank_guaranteed_usd TEXT NOT NULL
);

CREATE TABLE government_operations (
    id INTEGER PRIMARY KEY autoincrement,
    time_period TEXT NOT NULL,
    -- IN AMD MILLIONS
    total_revenue_and_grants TEXT NOT NULL,
    total_expenditure TEXT NOT NULL
);

CREATE TABLE query_source_result (
    id INTEGER PRIMARY KEY,
    download_date INTEGER NOT NULL,
    checksum TEXT NOT NULL,
    FOREIGN KEY (checksum) REFERENCES source_link(ID)
);

INSERT INTO source_link (data_category, descr, link_url)
VALUES
('Statistics',
'Central Government Debt',
'http://www.armstat.am/file/doc/99501863.xlsx');

INSERT INTO source_link (data_category, descr, link_url)
VALUES
('Statistics',
'General Government Operations',
'http://www.armstat.am/file/doc/99501858.xls');
