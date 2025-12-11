# SQLPage Directory

This directory contains SQLPage files for building dynamic web interfaces using SQL queries.

## What is SQLPage?

SQLPage is a tool that allows you to build web applications using only SQL queries. Each `.sql` file in this directory becomes a web page accessible through your browser.

## Accessing SQLPage

Once the Docker containers are running, access SQLPage at:
- http://localhost:8000/sqlpage/

## Files in this directory

- `index.sql` - Homepage with navigation
- `db-info.sql` - Database information and statistics
- `users.sql` - List of application users with statistics

## Creating New Pages

To create a new page:

1. Create a new `.sql` file in this directory
2. Use SQLPage components to build your interface
3. Access it at `http://localhost:8000/sqlpage/your-file.sql`

## Documentation

For complete SQLPage documentation and available components, visit:
- Official Docs: https://sql.ophir.dev/
- Component Library: https://sql.ophir.dev/documentation.sql?component=

## Examples

### Simple Text Page
```sql
SELECT 'text' as component,
       '# Hello World' as contents_md;
```

### Data Table
```sql
SELECT 'table' as component,
       'My Data' as title;

SELECT * FROM your_table;
```

### Form
```sql
SELECT 'form' as component,
       'submit.sql' as action;

SELECT 'Name' as label, 'name' as name;
SELECT 'Email' as label, 'email' as name, 'email' as type;
```

## Security Note

SQLPage has direct database access. Ensure proper authentication and authorization for production deployments. Consider:
- Adding authentication middleware in nginx
- Restricting SQLPage access to admin users only
- Using database user with limited permissions
