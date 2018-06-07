module.exports = {
    getAllClients: (req, res, next) => {
        const { companyid } = req.user;
        req.app.get('db').get_all_clients([companyid])
            .then( clients => {
                res.status(200).send(clients)
            })
    },

    getClientProjects: (req, res, next) => {
        const { clientID } = req.params;
        req.app.get('db').get_client_projects(clientID)
            .then( projects => {
                res.status(200).send(projects)
            })

    },

    addMemo: (req, res, next) => {
        const { date, hours, memo, projectid, employeeid } = req.body.memo;
        req.app.get('db').add_memo([date, hours, memo, projectid, employeeid])
            .then( () => res.sendStatus(200));
    },

    getUserMemos: (req, res, next) => {
        const { employeeid, date } = req.params;
        req.app.get('db').get_memos_by_user([employeeid, date])
            .then( memos => {
                res.status(200).send(memos)
            })
    },

    deleteMemo: (req, res, next) => {
        const { memoid } = req.params;
        req.app.get('db').delete_memo([memoid])
            .then( () => res.sendStatus(200))
    },

    editMemo: (req, res, next) => {
        const { memoid } = req.params;
        const { memo, hours, date } = req.body;
        req.app.get('db').edit_memo([memoid, hours, memo, date])
            .then( () => res.sendStatus(200))
    },

    getEmployees: (req, res, next) => {
        const { companyid } = req.user;
        req.app.get('db').get_all_employees([companyid])
            .then ( employees => {
                res.status(200).send(employees)
            })
    },

    getMainData: (req, res, next) => {
        const { startDate, endDate } = req.params;
        req.app.get('db').get_main_data([startDate, endDate])
            .then( mainData => {
                res.status(200).send(mainData)
            })
    },

    updateEmployee: (req, res, next) => {
        const { employeeid } = req.params;
        const {firstname, lastname, role, payrate, billingrate, email} = req.body;
        req.app.get('db').update_employee([employeeid, firstname, lastname, role, payrate, billingrate, email])
            .then( () => res.sendStatus(200));
    },

    deleteEmployee: (req, res, next) => {
        const { employeeid } = req.params;
        req.app.get('db').delete_employee([employeeid])
            .then( () => res.sendStatus(200));
    },

    addEmployee: (req, res, next) => {
        const { email, firstname, lastname, billingrate, payrate, role } = req.body;
        const { companyid } = req.user;
        req.app.get('db').add_employee([email, firstname, lastname, billingrate, payrate, role, companyid])
            .then( () => res.sendStatus(200));
    },

    deleteProject: (req, res, next) => {
        const { projectid } = req.params;
        req.app.get('db').delete_project([projectid])
            .then( () => res.sendStatus(200));
    },

    editProject: (req, res, next) => {
        const { projectid } = req.params;
        const { name, type, flatfee } = req.body;
        req.app.get('db').edit_project([projectid, name, type, flatfee])
            .then( () => res.sendStatus(200));
    },

    addClient: (req, res, next) => {
        const { firstname, lastname, email } = req.body;
        const { companyid } = req.user;
        req.app.get('db').add_client([firstname, lastname, email, companyid])
            .then( () => {res.sendStatus(200)})
    },

    updateEmail: (req, res, next) => {
        const { clientid } = req.params;
        const { email } = req.body;
        req.app.get('db').update_email([clientid, email])
            .then( () => res.sendStatus(200))
    },

    addProject: (req, res, next) => {
        const { clientid, name, type, flatfee} = req.body;
        req.app.get('db').add_project([clientid, name, type, flatfee])
            .then( () => res.sendStatus(200))
    },

    deleteClient: (req, res, next) => {
        const { clientid } = req.params;
        req.app.get('db').delete_client([clientid])
            .then( () => res.sendStatus(200));
    },

    getTwoWeekMemos: (req, res, next) => {
        const { employeeid } = req.user;
        const { one, fourteen } = req.params;
        req.app.get('db').get_two_week_memos([employeeid, one, fourteen])
            .then( memos => res.status(200).send(memos) )
    },

    getTwoWeekTotals: (req, res, next) => {
        const { employeeid } = req.user;
        const { one, fourteen } = req.params;
        req.app.get('db').get_two_week_totals([employeeid, one, fourteen])
            .then( totals => res.status(200).send(totals) )
    },

    getInvoiceMemos: (req, res, next) => {
        const { clientid, startDate, endDate } = req.params;
        req.app.get('db').get_invoice_memos([clientid, startDate, endDate])
            .then( memos => res.status(200).send(memos) )
    },

    getCompanyLogo: (req, res, next) => {
        const { companyid } = req.user;
        req.app.get('db').get_company_logo([companyid])
            .then( logo => res.status(200).send(logo))
    },

    updateCompanyLogo: (req, res, next) => {
        const { logoURL } = req.body;
        const { companyid } = req.user;
        req.app.get('db').update_company_logo([logoURL, companyid])
            .then( () => res.sendStatus(200))
    },

    logout: (req, res) => {
        req.logOut();
        res.status(302).redirect(process.env.LOGOUT_REDIRECT);
    },

    editInvoiceMemo: (req, res, next) => {
        const { memoid } = req.params;
        const { memo, employeeid, hours, projectid } = req.body;
        req.app.get('db').update_invoice_memos([memoid, memo, employeeid, hours, projectid])
            .then( () => res.sendStatus(200))
    },

    registerNewUser: (req, res, next) => {
        const {companyName, email, firstname, lastname, subscriptionid} = req.body;
        req.app.get('db').register_user([companyName, email, firstname, lastname, subscriptionid])
            .then( () => res.sendStatus(200))
    },

    getAllEmails: (req, res, next) => {
        req.app.get('db').get_all_emails()
            .then(emails => res.status(200).send(emails))
    }
}
