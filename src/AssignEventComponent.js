import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import First from './FirstComponent';
import './centered.css';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Cookies from 'universal-cookie';

class AssignEvent extends Component
{

    
    constructor(props)
    {
        super(props);
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.dropdownClicked = this.dropdownClicked.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.assignToMeClicked = this.assignToMeClicked.bind(this);
        this.state = {
            data: null,
            value: null,
            x: null,
            modalIsOpen: true,
            toMe: false,
            cookies: new Cookies,
            assigningToMeDone: false
        }
    }


    assignToMeClicked()
    {
        console.log("Clicked");

        var loggedin_user = this.state.cookies.get('loggedin_user');

        const user_id = loggedin_user.id;
        const user_name = loggedin_user.name;
        const user_email = loggedin_user.email;

        this.props.selectedIds.map((s) => {

            const url = 'http://203.17.194.45/eventApp/events/' +s+ '/assign';
            
                
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
        
        });

        this.setState({assigningToMeDone: true});
    }

     
      closeModal() {
        this.setState({modalIsOpen: false});
        
      }

      dropdownClicked(event)
      {
          this.setState({value: event.target.innerText});
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


  


    render() {


        if(this.state.assigningToMeDone === true)
        {
            return(<First />);
        }


       

        if(this.state.data !== null)
        {

        var yo = this.state.data.map((dd) => <DropdownItem onClick = {this.dropdownClicked}>{dd.name}</DropdownItem>);

        }

        //Displaying the events when the close button is clicked
        if(this.state.modalIsOpen === false)
        {
            return(
                <First />
            );
        }

       

        return (
          <div>
            
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal"
            >
              
              <h3 className = "assignHead_div">Select The User You These Events To Be Assigned to</h3>

              <button onClick={this.closeModal} className = "dismiss_div">Dismiss</button>

              <br />
              <br />

              <button onClick = {this.assignToMeClicked} className = "assignToMe_div">Assign To Me</button>

              <div>
                <form onSubmit={this.handleSubmit} className = "centered_div">
                        <b className = "assignText_div">
                            Assign To : 
                        </b>
                        <UncontrolledDropdown setActiveFromChild direction = "down">
                        <DropdownToggle tag="a" className="nav-link" caret onClick={this.dropdownClicked}>
                            <input type = "text" value = {this.state.value}/>
                        </DropdownToggle>
                        <DropdownMenu>
                            
                            
                        {yo}
                        
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        <input type="submit" value="Submit" className = "assignEventSubmit_div"/>
            
                </form>
            </div>
            </Modal>
          </div>
        );
      }
}

export default AssignEvent;