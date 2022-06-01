import React from 'react'
import NavigationView from '../views/NavigationView';


export default
function Navigation(props){
    const [sidebar, setSideBar] = React.useState(false);
    const [, setRenderStatus] = React.useState();

    function logOutUser(){
        props.model.setNavBarRender(0);
        console.log("logging out");
        window.location.hash="login"
    }
    
    function onSideBarChange(){
        setSideBar(!sidebar);
    }


    function ObserverACB(){
        setRenderStatus(props.model.navBarRender);
      }
    
      function isTakenDownACB(){
        props.model.removeObserver(ObserverACB);
      }
    
      function wasCreatedACB(){
        props.model.addObserver(ObserverACB);
        return isTakenDownACB;
      }
    
    React.useEffect(wasCreatedACB, []);

    return (
        <NavigationView onSideBarClick={onSideBarChange}
        logOut={logOutUser}
        renderStatus={props.model.navBarRender}
        userImage={props.model.user.photoURL}
        userName={props.model.user.displayName}/>
    );

}
