SELECT m.*, p.name, c.firstname, c.lastname
FROM memos m
JOIN projects p ON m.projectid = p.projectid
JOIN clients c ON p.clientid = c.clientid
WHERE employeeid = $1 and date = $2
ORDER BY c.lastname, c.firstname, p.name;