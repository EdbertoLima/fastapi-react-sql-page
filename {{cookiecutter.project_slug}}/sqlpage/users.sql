-- Users List Page
SELECT 'text' as component,
       '# Application Users' as contents_md,
       'This page shows all users from the application database.' as contents;

-- Users table
SELECT 'table' as component,
       'Users' as title,
       TRUE as sort,
       TRUE as search;

SELECT
    id as "ID",
    email as "Email",
    first_name as "First Name",
    last_name as "Last Name",
    CASE
        WHEN is_active THEN '✓ Active'
        ELSE '✗ Inactive'
    END as "Status",
    CASE
        WHEN is_superuser THEN '⭐ Admin'
        ELSE 'User'
    END as "Role"
FROM users
ORDER BY id;

-- Statistics card
SELECT 'card' as component,
       3 as columns;

SELECT
    'Total Users' as title,
    COUNT(*)::text as description
FROM users;

SELECT
    'Active Users' as title,
    COUNT(*)::text as description
FROM users
WHERE is_active = TRUE;

SELECT
    'Administrators' as title,
    COUNT(*)::text as description
FROM users
WHERE is_superuser = TRUE;

-- Back button
SELECT 'button' as component;
SELECT '/sqlpage/' as link, 'Back to Home' as title;
