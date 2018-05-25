SELECT SUM(m.hours) AS totalhours, p.type, e.employeeid, SUM(m.hours*e.payrate) AS totalpay
FROM projects p
JOIN memos m ON m.projectid = p.projectid
JOIN employees e ON e.employeeid = m.employeeid
WHERE date >= $1 AND date <= $2
GROUP BY p.type, e.employeeid;