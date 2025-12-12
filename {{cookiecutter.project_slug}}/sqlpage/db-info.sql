-- Database Information Page
SELECT 'text' as component,
       '# Database Information' as contents_md;

-- Show PostgreSQL Version
SELECT 'card' as component;
SELECT
    'PostgreSQL Version' as title,
    version() as description;

-- Show database statistics
SELECT 'table' as component,
       'Database Statistics' as title;

SELECT
    current_database() as "Database Name",
    pg_size_pretty(pg_database_size(current_database())) as "Database Size",
    (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public') as "Tables Count";

-- Show all tables
SELECT 'table' as component,
       'Available Tables' as title,
       TRUE as sort,
       TRUE as search;

SELECT
    table_name as "Table Name",
    table_type as "Type"
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Back button
SELECT 'button' as component;
SELECT '/sql/' as link, 'Back to Home' as title;
