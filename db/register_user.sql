WITH new_company AS (
    INSERT INTO companies
    (name, subscriptionid)
    VALUES
    ($1, $5)
    RETURNING companyid
)

INSERT INTO employees
(companyid, email, firstname, lastname, role)
SELECT companyid, $2, $3, $4, 'admin' FROM new_company;

