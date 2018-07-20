import React, { Component } from 'react';
import Ex from './Example';
import './centered.css';
import First from './FirstComponent';
import cookie from 'react-cookies';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

class Authentication extends Component
{

  constructor()
  {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
        value: null,
        data: null,
        len: null,
        valid: false,
        x: 0,
        email: null,
        cookies: new Cookies
    };
  }

  handleChange(event) {

 this.setState({value: event.target.value});

  }

  componentDidMount()
  {
    fetch('http://203.17.194.45/eventApp/users/all')
    .then(results =>
      results.json()
    )
    .then(data => this.setState({data: data, len: data.length}));
    
  }

  handleSubmit(event) {
     

     this.state.data.map((dd) =>
     {
       if(dd.name === this.state.value)
       {
         this.setState({valid: true, x: 1, value: dd.name, email: dd.email});
         this.state.cookies.set('loggedin_user', dd, { path: '/' });

       }
      
     }
   );


       }






  render()
  {

    

    //Default Button
    if(this.state.data !== null && this.state.x===0)
    {
      const name = this.state.value;
       this.state.cookies.set('name', this.state.value, { path: '/' });

   

    return(
      <form onSubmit={this.handleSubmit} className = "centered_div">
         <label>
           Name:
           <input type="text" value={this.state.value} onChange={this.handleChange}/>
         </label>
            <input type="submit" value="Submit" />

       </form>
    );
  }

  //Button after invalid input
  if(this.state.x === 2)
  {
    const name = this.state.value;
    const email = this.state.email;
     this.state.cookies.set('name', this.state.value, { path: '/' });
     this.state.cookies.set('email', this.state.email, { path: '/' });


    return(
      <div className = "centered_div">
      <form onSubmit={this.handleSubmit}>
         <label>
           Name:
           <input type="text" value={this.state.value} onChange={this.handleChange} />

         </label>
         <input type="submit" value="Submit" />
       </form>
       <p><font color="red">Not an authorized user !!</font></p>
      </div>
    );
  }

  if(this.state.data !== null && this.state.valid === true)
  {

      
     const name = this.state.value;
     this.state.cookies.set('name', this.state.value, { path: '/' });
     this.state.cookies.set('email', this.state.email, { path: '/' });

    return(<Valid />);
  }



  return(<div>Loading</div>);
  }
}

function Valid()
{
  return(
    <Link to = "/details">SHOW EVENTS</Link>
  );
}




export default Authentication;
