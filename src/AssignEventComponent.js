import React, { Component } from 'react';

class AssignEvent extends Component
{

    
    constructor(props)
    {
        super(props);
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: null,
            x: null
        }
    }

    componentDidMount()
    {
        fetch('http://203.17.194.45/eventApp/users/all')
        .then(results =>
        results.json()
        )
        .then(data => this.setState({data: data}))
    }
   
    
    handleChange(event) {

        this.setState({value: event.target.value});
       
    }

    handleSubmit(event)
    {
        
       var user_email, user_id, user_name = null;



        this.props.selectedIds.map((s) => {


           console.log(s);

            if(this.state.data !== null)
            {
                this.state.data.map((dd) => {
                    if(dd.name === this.state.value)
                    {
                    user_id = dd.id;
                    user_email = dd.email;
                    user_name = dd.name;
    
                    }
    
                        return;
                });

                    const url = 'http://203.17.194.45/eventApp/events/' +s+ '/assign';
        
                    console.log(url);        
                    let myHeaders = new Headers();
                    myHeaders.append('Content-Type', 'application/json');

                    let fetchData = { 
                        method: 'POST', 
                        body: JSON.stringify({
                            "id": user_id,
                            "name": user_name,
                            "email": user_email
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

            return;


        });
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