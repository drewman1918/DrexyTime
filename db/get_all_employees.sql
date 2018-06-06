SELECT *
FROM employees
WHERE companyid = $1
ORDER BY firstname;