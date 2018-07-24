import React, { Component } from 'react';
import {Nav, Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import './centered.css';
import Second from './SecondComponent';
import { UncontrolledDropdown } from 'reactstrap';
import SignUp from './SignUpComponent';
class NavbarFeatures extends React.Component {


    constructor()
    {
        super();
        this.state = {
            myevents: null,
            cookies: new Cookies,
            events: null
        }
    }

    componentDidMount()
    {
        
		  fetch('http://203.17.194.45/eventApp/events/userAgg')
          .then(results =>
            results.json()
          )
          .then(data => this.setState({myevents: data}));


          fetch('http://203.17.194.45/eventApp/events/typeAgg')
	    .then(results =>
	      results.json()
	    )
		.then(data => this.setState({events: data, evlen: data.length}));
		
    }




    render() {

        var page_name = this.state.cookies.get("page_name");

        var name = this.state.cookies.get('name');
       

        if(this.state.events !== null)
        {

            var yo = this.state.events.map((ev) => <DropdownItem tag="a" href={`/details/${ev.id}`}>{ev.id}({ev.count})</DropdownItem>);

        }

        var myeventscount = 0;

        if(this.state.myevents !== null){
			for(var i = 0; i<this.state.myevents.length; i++)
			{
				if(this.state.myevents[i].id === this.state.cookies.get('name'))
				{
					
					myeventscount = this.state.myevents[i].count;
				}
            }
            
        }
        
        

        if(name !== 'null')
        {
        return (
            <div>


                
                <Navbar color="indigo" light    >
                    <NavbarBrand href="/">
                        <strong>Edelweiss</strong>
                    </NavbarBrand>
                    <Nav navbar>
                          <NavItem>
                                <NavLink className="nav-link"  to='/login'><span className="fa fa-home fa-lg"></span> Logout</NavLink>

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

                <hr />

                <Navbar color="light" light >
                    <div className="container">
                    <Nav navbar>
                    
                    <div className = "center_div">
                    <Link to = "/myevents">
                        <a>Assigned To Me({myeventscount})</a>
                    </Link>
                    </div>
                    <div className = "left_div">
                    <Link to = "/details">
                        <a>All Events</a>
                    </Link>
                    </div>
                    
                    
                    <UncontrolledDropdown direction = "down " className = "right_div">
                    <DropdownToggle tag="a" className="nav-link" caret>
                        Filter By Events
                    </DropdownToggle>
                    <DropdownMenu>
                        
                        
                        {yo}
                    
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                    </div>
                </Navbar>   


                   
            </div>
        );
        }   

        return (
            <div>


                
                <Navbar color="indigo" dark    >
                    <NavbarBrand href="/">
                        <strong>Edelweiss</strong>
                    </NavbarBrand>
                    <Nav navbar>
                          <NavItem>
                          <NavLink className="nav-link"  to='/SignUp'><span className="fa fa-user-plus fa-lg"></span> Add a new user</NavLink>

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

                
                
            </div>
        );
    }
}

export default NavbarFeatures;
