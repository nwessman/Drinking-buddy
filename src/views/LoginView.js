import React from "react";
import { Button } from 'semantic-ui-react'

export default function LoginView(props){
    
  return (
    <div className="background_image">
      
        <div className="searchWrapper"> 
            <div className="box2">
            <h2 className='boxHeader'> Start planning your trip today!</h2>
            <div className="firstMessage">TravelBuddy is your friend when planning your next vacation. Schedule flights, hotels and explore attractions within your destination. </div>
            <Button className = "loginButton" size = "massive" onClick={props.userLogin}> Get started! </Button>
            </div>
        </div>        

        {/* <TextField id = "email" label = "Email" onChange = {setEmailACB}>

        </TextField>
        
        <TextField id = "password" label = "Password" onChange = {setPasswordACB}>

        </TextField> */}
    </div>);
        
}