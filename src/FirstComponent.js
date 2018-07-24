//Have to implement show less for data and assigned to
//PATH = '/details'

import React, { Component } from 'react';
import Second from './SecondComponent';
import './centered.css';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import EventsFilter from './EventsFilterComponent';
import Checkbox from '@material-ui/core/Checkbox';
import { easing } from '@material-ui/core/styles/transitions';
import AssignEvent from './AssignEventComponent';


class First extends Component
{

	

	constructor()
	{
		
		super();
		this.assignBtn = this.assignBtn.bind(this);
		this.clearBtn = this.clearBtn.bind(this);
		this.state = {
			data: null,
		
			cookies: new Cookies,
			events: null,
			evlen: null,
			myevents: null,
			sev: null,
			isSelected: false,
			selectedRowIds: [],
			x: 0,
			selectedIds: [],
			assignClicked: false,
			rowSelected: false,
			yes: false
		};
	}

	clearBtn(event)
	{
		this.setState({selectedIds: []});
	}

	assignBtn(event)
	{
		this.setState({assignClicked: true});
	}
	
	handleClick(event, i)
	{ 
		
		var present = 0;
		this.state.selectedIds.map((id) => 
			{i === id ? present = 1 : null}
		);
				
			
			
		//If not present
		
		if(present !== 1)
		{
			this.setState({selectedIds: [...this.state.selectedIds, i]});
		
			
			
		}

		//If already present
		else if(present === 1){
			
			const index = this.state.selectedIds.indexOf(i);
	
			
			this.state.selectedIds.splice(index, 1);
			this.setState({yes: true});
			
			
		}
		
		
		
		const key = event.target.key;
	}
	
    
    componentDidMount()
	{
		
		  fetch('http://203.17.194.45/eventApp/events/all')
	    .then(results =>
	      results.json()
	    )
		.then(data => this.setState({data: data, len: data.length}));
		
	}
	

	isSelected(id){ 
		if(this.state.selectedIds.indexOf(id) === -1)
		{
			return false;
		}
		else{
			return true;
		}
	}
	
	
    
    render()
	{
	

		
		this.state.cookies.set('page_name', 'Filter By Severity', { path: '/' });

		if(this.state.assignClicked === true)
		{
			return(
				<AssignEvent selectedIds = {this.state.selectedIds}/>
			);
		}
		
		

        var name =this.state.cookies.get('name');
        
        //Variables declaration
        var keys;var extraKeys; var extraValues; var val;
        var extraDatakeys; var extraDatavalues; var extraAsskeys; var extraAssvalues;
		var valuesMapped; var ob; var ob1;


		
		
		if(this.state.events !== null)
        {
           
        }

        if(this.state.data !== null)
		{
            var dd = this.state.data.map((d) => {

				
                val = Object.values(d);
                keys = Object.keys(d);
                extraKeys = keys.splice(4,2);
				extraValues = val.splice(4,2);


				
				const isSelected = this.isSelected(d.id);
				
				
				if(extraValues[0] !== null && typeof extraValues[0] === 'object'){
					
					ob = <ExtractData values = {extraValues[0]} />
				}

				else{
					ob = <div>{extraValues[0]}</div>;
				}

				if(extraValues[1] !== null && typeof extraValues[1] === 'object'){
					
					ob1 = <ExtractAss values = {extraValues[1]} />
				}

				else{
					if(extraValues[1] == null)
					{
						
							ob1 = "Assign This Event Now";
						
					}
					else
					{
					ob1 = extraValues[1];
					}
				}
              	let valuesMapped = val.map((v) =>
					
					<Convert value = {v} kk = {keys[0]} />
		
			
				);

				//If the event hasn't been assigned yet
				if(ob1 == "Assign This Event Now")
				{
					return(
						
						<TableRow  onClick={event => this.handleClick(event, d.id)}
											role="checkbox" 
											key = {d.id}
											selected={isSelected}
											hover = {true}
											
											>
							
							{valuesMapped}
							
							<TableCell> 
								{ob}
							</TableCell>
							
							<TableCell >
								
							</TableCell>
							
						</TableRow>
					);
				}

				//If the event has already been assigned, no need to hyperlink to "assignevent" component
				return(

					
						
					<TableRow onClick={event => this.handleClick(event, d.id)}
										role="checkbox" 
										key = {d.id}
										selected={isSelected}
										hover = {true}
										
							   			>
							  
						
						{valuesMapped}
						
						<TableCell> 
							{ob}
						</TableCell>
						
						<TableCell >
							
							{ob1}
							
						</TableCell>
						
					</TableRow>
				);

				
            });
        
			

            if(this.state.cookies.get('name') == 'null')
            {
                
                return(

                    <div>You are nOt logged in</div>

                );

            }

            else if(this.state.cookies.get('name') != 'null'){
				
									
				
				if(this.state.myevents !== null){
				
					}
				
                return(
					<div>

						


						{this.state.selectedIds.length > 0 ? <div><button type="button" onClick = {this.assignBtn} >Assign The Selected Items({this.state.selectedIds.length})</button></div> : null}
                        
                        {this.state.selectedIds.length > 0 ? <button type="button" onClick = {this.clearBtn} >Clear All</button> : null}
					
						<Table  multiSelectable={true} onRowSelection={this.onRowSelection}> 
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>TYPE 
										
									</TableCell>
									<TableCell >SEVERITY</TableCell>
									<TableCell >EVENT TIME</TableCell>
									<TableCell >DATA</TableCell>
									<TableCell >ASSIGNED TO</TableCell>
									 
								</TableRow>
							</TableHead>
							<TableBody>
								
								{dd}
								
							</TableBody>
						</Table>
					</div>
					

                );
            }
        }

        return(<div>Loading...</div>);
	}
	
	

	

}

const Convert = ({value}, {kk}) => {

	
	

	if(!isNaN(value) && value.toString().length>=10)
	{
		
		if(value.toString().length<13)
		{
			value = value * 1000;
		}
		return(

			<TableCell>
				{new Date(value).toString().substring(0, 24)}
			</TableCell>
		);
	}
	
    return(
        
		<TableCell>
			{value}
		</TableCell>
       
    );
}


function ExtractData(props)
{
	
	const val = Object.values(props.values);
	const keys = Object.keys(props.values);

	
	var items = val.map((value, x = 0) => {
		return(

			<div>
				<div><b>{keys[x]}	:	</b> {value}</div>


			</div>

		);

	{x++}
	}

	);

	return(<div>{items}</div>);

}

function ExtractAss(props)
{
	
	
	const val = Object.values(props.values);
	const keys = Object.keys(props.values);

	
	var items = val.map((value, x = 0) => {
		return(

			<div>
				<div><b>{keys[x]}	:	</b>{value}</div>


			</div>

		);

	{x++}
	}

	);

	return(<div>{items}</div>);
}

export default First;