import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/Login'
import Main from './pages/Main'
import AdminPage from './pages/AdminPage'
import Crpdaz from './pages/Crpdaz'
import Default from './pages/Default'
import AllTopic from './pages/AllTopic'
import WebBoard from './pages/WebBoard'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            {!localStorage.getItem('username') ? (
            <Redirect to="/login" />
            ) : (
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/AllTopic" component={AllTopic} />
                <Route exact path="/WebBoard" component={WebBoard} />
                <Route exact path="/Crpdaz" component={Crpdaz} />
                {localStorage.getItem('department') !== 'admin' ? (
                <Redirect to="/" />
                ) : (
                <Switch>
                    <Route exact path="/admin" component={AdminPage} />
                    <Route exact path="*" component={Default} />
                </Switch>
                )}
            </Switch>
            )}
        </Switch>
    )
}

export default Routes