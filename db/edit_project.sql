UPDATE projects
SET name = $2, type = $3, flatfee = $4
WHERE projectid = $1;