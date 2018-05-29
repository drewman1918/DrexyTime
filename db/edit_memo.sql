UPDATE memos
SET hours = $2, memo = $3, date = $4
WHERE memoid = $1;