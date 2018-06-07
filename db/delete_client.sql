DELETE
FROM memos
WHERE projectid IN (
    SELECT projectid
    FROM projects
    WHERE clientid = $1
);

DELETE
FROM projects
WHERE clientid = $1;

DELETE
FROM clients
WHERE clientid = $1;