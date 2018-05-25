UPDATE employees
SET firstname = $2, lastname = $3, role = $4, payrate = $5, billingrate = $6, email = $7
WHERE employeeid = $1;