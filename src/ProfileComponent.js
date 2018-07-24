import React, { Component } from 'react';
import cookie from 'react-cookies';
import Cookies from 'universal-cookie';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './centered.css';


class Profile extends Component
{
  constructor()
  {
    super();
    this.state = {
      data: null
    }

  }

  componentDidMount()
  {
    fetch('http://203.17.194.45/eventApp/users/all')
    .then(results =>
      results.json()
    )
    .then(data => this.setState({data: data, len: data.length}));
    
  }

  render()
  {
    const cookies = new Cookies();

    cookies.set('page_name', 'Filter By Severity', { path: '/' });

    
    const name = cookies.get('name');
    const email = cookies.get('email');
  
    if(name != 'null')
    {
      

      return(

        <Card className = "col-3 mt-5 centered_div">
				<CardImg top width="100%" src = {'/assets/images/pro.png'} alt = {name} />
				<CardBody>
					<CardTitle>{name}</CardTitle>
					<CardText>{email}</CardText>
				</CardBody>
			</Card>
      );
    }

    else if(name == 'null'){

    return(
      <div>You are not logged in</div>
    );}

  }
}

export default Profile;
