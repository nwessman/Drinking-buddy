
import React from 'react'

export default
function Show(props){
    const [hashState, setHash]=React.useState(window.location.hash);
    function hashListenerACB(){setHash(window.location.hash);}
    function wasCreatedACB(){  
        window.addEventListener("hashchange", hashListenerACB);   // 1 subscribe
        function tearDownACB(){ window.removeEventListener("hashchange", hashListenerACB); } 
        return tearDownACB;
    }
    React.useEffect(wasCreatedACB, []); 
    function showOneHash(){if(props.hash !== hashState) return "hidden"; else return "";}

    return (
        <div className={showOneHash()}>{props.children}</div>

    );

    

}