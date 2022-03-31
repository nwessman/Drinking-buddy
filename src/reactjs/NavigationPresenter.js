import React, {useState} from 'react'
import NavigationView from '../views/NavigationView';


export default
function Navigation(){
    const [sidebar, setSideBar] = useState(false);
    
    function onSideBarChange(){
        setSideBar(!sidebar);
    }

    return (
        <NavigationView onSideBarClick={onSideBarChange}/>
    );

}
