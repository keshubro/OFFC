import React, { Component } from 'react';
import './centered.css';
import Cookies from 'universal-cookie';

class SignUp extends Component
{

    constructor()
    {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            name: '',
            email: '',
            
            cookies: new Cookies
        }
    }

    

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        
    }

    handleSubmit(event)
    {

        var milliseconds = (new Date).getTime();
        
        const name = this.state.name;
        this.state.cookies.set('name', this.state.name, { path: '/' });

        const url = 'http://203.17.194.45/eventApp/users';
        
        let data = {
            name: this.state.name,
            email: this.state.email,
            createdAt: milliseconds
        }
        
        let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

        let fetchData = { 
            method: 'PUT', 
            body: JSON.stringify(data),
            headers: myHeaders
        }
        fetch(url, fetchData)
        .then(function() {
            // Handle response you get from the server
        })
        .catch(function(error){
console.log(error);
        });
       
    }

    render()
    {
        
        return(
            
            <form onSubmit={this.handleSubmit} className = "centered_div">
                <label>
                    Name:
                    <input type="text" value={this.state.value} name = "name" onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Email:
                    <input type="email" value={this.state.email} name = "email" onChange={this.handleChange}/>
                </label>
                <br/>
               
                <br/>
                    <input type="submit" value="Submit" />
        
            </form>

          );
          
    }
}

export default SignUp;