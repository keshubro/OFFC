import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import Authentication from './AuthenticationComponent';
import First from './FirstComponent';
import NavbarFeatures from './HeaderComponent';
import Profile from './ProfileComponent';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Users from './UsersComponent';
import EventsFilter from './EventsFilterComponent';
import MyEventsFilter from './MyEventsFilterComponent';
import SeverityFilter from './SeverityFilterComponent';
import SignUp from './SignUpComponent';
import AssignEvent from './AssignEventComponent';

class Main extends Component
{
  render()
  {
    const theme = createMuiTheme();

    

    const LoginPage = () => {
    return (
        <Authentication />

      );
  }


    return(
      <div>

        <NavbarFeatures />

        <MuiThemeProvider theme={theme}>
        <Switch>
            <Route path = '/login' component = {LoginPage} />
            
            <Route exact path = '/details' component = {First} />
           
            <Route path = '/profile' component = {Profile} />
            <Route path = '/users' component = {Users} />
            <Route path = '/details/:eventId' component = {EventsFilter} />
            <Route path = '/myevents' component = {MyEventsFilter} />
            <Route path = '/severityevents' component = {SeverityFilter} />
            <Route path = '/signup' component = {SignUp} />
            <Route path = '/assignevent' component = {AssignEvent} />
            <Redirect to = '/login' />
        </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Main;
