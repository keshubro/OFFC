import React, { Component } from 'react';

class AssignEvent extends Component
{

    
    constructor()
    {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: null,
            x: null
        }
    }

    componentDidMount()
    {
        
        fetch('http://203.17.194.45/eventApp/events/all')
        .then(results =>
        results.json()
        )
        .then(data => this.setState({data: data}));
    }

    
    handleChange(event) {

        this.setState({value: event.target.value});
       
    }

    handleSubmit(event)
    {
        
        var x = null; var y = null;


        if(this.state.data !== null)
        {
           

            

            console.log(x);
            // x.id = this.state.value;
            console.log(x);

            const url = 'http://localhost:8080/topics/Y';
        
       
        
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let fetchData = { 
                method: 'PUT', 
                body: JSON.stringify( {
                  "firstName": "Gar",
                  "lastName": "Sharma",
                  "id": "Y"
              }),
                headers: myHeaders
            }
            fetch(url, fetchData)
            .then(function() {
                // Handle response you get from the server
                console.log("Done");
            })
            .catch(function(error){
            console.log(error);
            });

            
         
            

            
        }
    }


    render()
    {
        

        return(
        
            <form onSubmit={this.handleSubmit} className = "centered_div">
                <label>
                    Assign To:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                    <input type="submit" value="Submit" />
        
            </form>
             
        );
    }
}

export default AssignEvent;