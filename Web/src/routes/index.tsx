import React from 'react'
import { Switch } from 'react-router-dom'

import SignIn from '../pages/signin'
import SignUp from '../pages/signup'
import Dashboard from '../pages/dashboard'
import Route from './routes'

const Routes:React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" isPrivate component={Dashboard} />
  </Switch>
)

export default Routes