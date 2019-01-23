import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Missing from './Missing'
import Error from './Error'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter ,Switch,Redirect} from 'react-router-dom'
import {Route} from "react-router-dom";
import DashboardScreen from "./ViewScreens/DashboardScreen";
import LoginScreen from './ViewScreens/LoginScreen'
import {isAuthenticated} from "./Util/Auth/AuthTokenManager";

ReactDOM.render(

    <BrowserRouter>
        <Switch>

            <Route exact path='/' render={() => {
                if (isAuthenticated()) {
                    return <Redirect to='/dashboard'/>

                }
                else {
                    return <Redirect to='/login'/>
                }
            }} />

            <Route exact path='/dashboard' render={() => {
                if (isAuthenticated()) {
                    return <DashboardScreen />
                }
                else {
                    return <Redirect to='/login'/>
                }
            }} />
            <Route exact path='/login' render={() => {
                if (isAuthenticated()) {
                    return <Redirect to='/dashboard'/>
                }
                else {
                    return <LoginScreen />
                }
            }} />

            <Route exact path='/error' component={Error}/>

            <Route component={Missing} />
        </Switch>
    </BrowserRouter>
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
