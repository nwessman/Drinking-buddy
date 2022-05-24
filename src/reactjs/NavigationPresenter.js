import React from 'react'
import NavigationView from '../views/NavigationView';


export default
function Navigation(){
    const [sidebar, setSideBar] = React.useState(false);

    function logOutUser(){
        window.location.hash="login"
    }
    
    function onSideBarChange(){
        setSideBar(!sidebar);
    }

    return (
        <NavigationView onSideBarClick={onSideBarChange}
        logOut={logOutUser}/>
    );

}
