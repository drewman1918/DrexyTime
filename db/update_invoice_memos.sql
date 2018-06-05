UPDATE memos
SET memo = $2, employeeid = $3, hours = $4
WHERE memoid = $1;