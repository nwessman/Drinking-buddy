import React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function LoginView(props){
    
  return (
    <div className="background_image">
      
        <div className='navigationbar'>
                <h1 className='name_logo'>TravelBuddy</h1>
        </div>
        <div className="searchWrapper"> 
            <div className="box2">
            <h2 className='flightHeader'> Start planning your trip today!</h2>
            <button className='loginButton' onClick={props.userLogin}> Get started! </button>
            </div>
        </div>        

        {/* <TextField id = "email" label = "Email" onChange = {setEmailACB}>

        </TextField>
        
        <TextField id = "password" label = "Password" onChange = {setPasswordACB}>

        </TextField> */}
    </div>);
        
}