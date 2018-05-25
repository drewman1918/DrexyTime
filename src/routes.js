import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyTime from './components/MyTime/MyTime';
import TimePerClient from './components/TimePerClient/TimePerClient';
import TimePerEmployee from './components/TimePerEmployee/TimePerEmployee';
import ClientManagement from './components/ClientManagement/ClientManagement';
import EmployeeManagement from './components/EmployeeManagement/EmployeeManagement';

const routes = (
        <Switch>
            <Route path = "/mytime" component = {MyTime}/>
            <Route path = "/timeperclient" component = {TimePerClient}/>
            <Route path = "/timeperemployee" component = {TimePerEmployee}/>
            <Route path = "/clientmanagement" component = {ClientManagement}/>
            <Route path = "/employeemanagement" component = {EmployeeManagement}/>
        </Switch>
)

export default routes;