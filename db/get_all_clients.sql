SELECT *
FROM clients
WHERE companyid = $1
ORDER BY lastname;