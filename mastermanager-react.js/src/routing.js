import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard/dashboard'
import LogIn from './Login/login'
import Register from './Register/register'

class PageRouter extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path = "/" exact component = {LogIn}/>
                    <Route path = "/register" exact component = {Register}/>
                    <Route path = "/dashboard" exact component = {Dashboard}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default PageRouter;