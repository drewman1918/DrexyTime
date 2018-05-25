module.exports = {
    getAllUsers: (req, res, next) => {
        req.app.get('db').get_all_users()
            .then( users => {
                res.status(200).send(users)
            })
    },

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
    }
}
