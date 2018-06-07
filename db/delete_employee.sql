DELETE FROM memos
WHERE employeeid = $1;

DELETE FROM employees
WHERE employeeid = $1;