SELECT *
FROM projects
WHERE clientid = $1
ORDER BY name;