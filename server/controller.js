module.exports = {
    getAllClients: (req, res, next) => {
        req.app.get('db').get_all_clients()
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
        req.app.get('db').get_all_employees()
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
        req.app.get('db').add_employee([email, firstname, lastname, billingrate, payrate, role])
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
        req.app.get('db').add_client([firstname, lastname, email])
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
    }
}