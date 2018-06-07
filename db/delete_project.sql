DELETE FROM memos
WHERE projectid = $1;

DELETE FROM projects
WHERE projectid = $1;