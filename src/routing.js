import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard/dashboard'
class PageRouter extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path = "/" exact component = {Dashboard}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default PageRouter;