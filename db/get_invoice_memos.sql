SELECT c.firstname, c.lastname, m.memo, m.hours, m.date, m.memoid, m.employeeid, m.projectid, e.firstname as employee_firstname, e.lastname as employee_lastname, e.billingrate, p.name as projectname, p.clientid
FROM memos m
JOIN employees e ON e.employeeid = m.employeeid
JOIN projects p ON p.projectid = m.projectid
JOIN clients c ON c.clientid = p.clientid
WHERE c.clientid = $1 AND date BETWEEN $2 AND $3
ORDER BY date ASC;