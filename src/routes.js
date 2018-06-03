import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyTime from './components/MyTime/MyTime';
import TimePerClient from './components/TimePerClient/TimePerClient';
import TimePerEmployee from './components/TimePerEmployee/TimePerEmployee';
import ClientManagement from './components/ClientManagement/ClientManagement';
import EmployeeManagement from './components/EmployeeManagement/EmployeeManagement';
import MyAccount from './components/MyAccount/MyAccount';
import MyCompany from './components/MyAccount/MyCompany';

const routes = (
        <Switch>
            <Route path = "/mytime" component = {MyTime}/>
            <Route path = "/myaccount" component = {MyAccount}/>
            <Route path = "/mycompany" component = {MyCompany}/>
            <Route path = "/invoicing" component = {TimePerClient}/>
            <Route path = "/userstatistics" component = {TimePerEmployee}/>
            <Route path = "/clientmanagement" component = {ClientManagement}/>
            <Route path = "/usermanagement" component = {EmployeeManagement}/>
        </Switch>
)

export default routes;