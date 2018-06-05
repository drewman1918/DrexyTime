UPDATE memos
SET memo = $2, employeeid = $3, hours = $4, projectid = $5
WHERE memoid = $1;