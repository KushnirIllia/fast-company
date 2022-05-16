import React from 'react'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import { Redirect, Route, Switch } from 'react-router-dom'
import MainPage from './layouts/main'
import Login from './layouts/login'

const App = () => {
  return <>
    <NavBar/>
    <Switch>
      <Route path={'/'} exact component={MainPage}/>
      <Route path={'/login/:type?'} component={Login}/>
      <Route path={'/users/:userId?'} component={Users}/>
      <Redirect to={'/'}/>
    </Switch>
  </>
}
export default App