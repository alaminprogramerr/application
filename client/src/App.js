import React from 'react';
import Navbar from './component/Navbar'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './component/Home'
import Profile from './component/Profile'
import Login from './component/Login'
import Signup from './component/Signup'
import AllUser from './component/AllUser'
class App extends React.Component {
 
  render(){
    return (
      <BrowserRouter>
          <Navbar/>
        <Switch>
          <Route path='/profile' component={Profile} />
          <Route path='/signup' component={Signup} />
          <Route path='/home' component={Home} />
          <Route path='/all-user' component={AllUser} />
          <Route path='/' exect={true} component={Login} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
