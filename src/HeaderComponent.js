import React, { Component } from 'react';
import {Nav, Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, UncontrolledDropdown, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import {Link} from 'react-router-dom';


class NavbarFeatures extends React.Component {

    




    render() {

        


        return (
            

                <Navbar color="indigo" dark expand="sm">
                    <NavbarBrand href="/">
                        <strong>Edelweiss</strong>
                    </NavbarBrand>
                    <Nav navbar>
                          <NavItem>
                              <NavLink className="nav-link"  to='/login'><span className="fa fa-home fa-lg"></span> Login</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink className="nav-link" to='/details'><span className="fa fa-list fa-lg"></span> Events</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink className="nav-link" to='/profile'><span className="fa fa-info fa-lg"></span> Profile</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink className="nav-link" to='/users'><span className="fa fa-user fa-lg"></span> Users</NavLink>
                          </NavItem>

                   </Nav>
                </Navbar>

            
               
        );
    }
}

export default NavbarFeatures;
