SELECT STRING_AGG(m.memo, '<br/><br/>') as memo, SUM(m.hours) as hours, m.date, 
    (c.lastname || ', ' || c.firstname || ' - ' || p.name) as completename
FROM memos m
JOIN projects p ON p.projectid = m.projectid
JOIN clients c ON c.clientid = p.clientid
WHERE m.employeeid = $1 AND date BETWEEN $2 AND $3
GROUP BY completename, m.date
ORDER BY completename;