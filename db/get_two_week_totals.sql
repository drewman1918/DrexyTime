SELECT SUM(hours) as totalhours, date
FROM memos m
WHERE m.employeeid = $1 AND date BETWEEN $2 AND $3
GROUP BY date;