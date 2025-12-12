-- SQLPage Index Page
-- This is the default page shown when accessing /sqlpage/
-- For more information, visit: https://sql.ophir.dev/

-- Hero Section
SELECT 'hero' as component,
       'Welcome to SQLPage' as title,
       'Build dynamic web applications using only SQL queries' as description,
       'https://sql.ophir.dev/' as link,
       'Learn More' as link_text;

-- Card Section
SELECT 'card' as component,
       2 as columns;

SELECT
    'Database Info' as title,
    'View your database connection and statistics' as description,
    '/sql/db-info.sql' as link,
    'View Details' as link_text;

SELECT
    'Users List' as title,
    'Browse all users from the application database' as description,
    '/sql/users.sql' as link,
    'View Users' as link_text;

-- Footer
SELECT 'text' as component,
       '---' as contents_md;

SELECT 'text' as component,
       'Powered by [SQLPage](https://sql.ophir.dev/) • Part of {{cookiecutter.project_name}}' as contents_md;
